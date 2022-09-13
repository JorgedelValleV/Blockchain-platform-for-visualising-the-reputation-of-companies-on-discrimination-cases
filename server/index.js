"use strict"; //Nos aseguramos de que no se puedan usar variables sin declarar

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); //Se cargan las variables de entorno a process.env
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const genName = require("randomstring");
var session = require('express-session');
//Modelos para las distintas colecciones de la base de datos
var User = require('./User.module.js');
var Metrics = require('./Metrics.module.js');
var Chart = require('./Chart.module.js');
//Funciones para gestión de datos de las gráficas
const chartUtils = require('./Chart.utils.js');
//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpecification = require('./swaggerSpecification');
//Se importa para poder ejecutar el scraper + cron para que se ejecute cada 24h
var { PythonShell } = require('python-shell');
const cron = require('node-cron');
//Almacenado de sesiones en BD
const MongoStore = require('connect-mongo');

//Servidor
const app = express();
const port = process.env.PORT; //Se esta ejecutando en local, en un puerto distinto a la web

//Se deshabilita la cabecera x-powered-by para evitar fingerprinting (que no se sepa que se esta utilizando express)
app.disable('x-powered-by');

app.listen(port, () => {   
  console.log("El servidor se está ejecutando.");
  
});

//Conexion con BBDD
try {
mongoose.connect(`${process.env.MONGO_START}${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_STREAM}`,{
  useNewUrlParser: true, 
  useUnifiedTopology: true
}, ()=>{
  console.log("Conectado a la BD exitosamente.");
  chartUtils.initChartData(); //Se inicializan las gráficas si no lo están aún
})
}catch(e){
  console.error("No se ha podido conectar a la BD.");
}

//Habilitar cross-site requests PERO solo desde nuestra pagina de react
//credentials a true --> Access Control Allow Credentials
app.use(cors({origin : `${process.env.REACT_PAGE}:3000` , credentials: true}));

//Recibir las respuestas como un json y poder dividirlos en clave-valor
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Se establece el tiempo  en el que la sesion expira
const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

//Se usa httpOnly para evitar ataques XSS. Se usaria secure cookies también (al ser en localhost no es necesario)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoose.connection._connectionString }),
  cookie: { expires: expiryDate,  httpOnly: true }
}));

app.use(passport.initialize());
app.use(passport.session());

//Definimos la estrategia
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.REDIRECT_URI,
  scope: ['r_liteprofile'],
  state: true //Util para evitar CSRF
}, function(accessToken, refreshToken, profile, done) { //Callback
  //Verificacion asincrona
  process.nextTick(function () {

    //vamos a comprobar si el usuario está en la BD, si no, se añade
    User.findOne({'l_id' : profile.id}, (err, doc) =>{
      if(err) return done(err, null);
      else if(!doc){
          let unique = false;
          let username;
          /*
            Generamos un nombre de usuario y comprobamos que no exista ya: 
            Normalmente el bucle tendra una complejidad O(log n) ya que es dificil que 
            se repita un nombre de usuario de tal longitud y se posee un indice en l_id.
          */
          while(!unique){
            username = genName.generate({length:15,charset: 'alphanumeric'});
            unique = User.findOne({'u_name': username}, (err, res) =>{
              if(err) return false;
              else if(!res) return true;
              else return false;
            });
          }
          //Guardamos el id y el usuario generado de forma aleatoria
          const new_user = new User({ l_id : profile.id , u_name : username});
          new_user.save(function(){});

          //Se utiliza el documento del nuevo usuario
          return done(null,new_user);
      }
      else{
          //Si el usuario ya existe se devuelve el documento
          return done(null, doc);
      }
    });    
  });
}));

//Se redirige a Linkedin, donde se hará la autenticación
/**
* @openapi
* /auth/linkedin:
*   get:
*     tags: 
*       - Login
*     summary: Redirigir a Linkedin.
*     description: Envía al usuario a la página de Linkedin para que allí se autentique.
*     responses: 
*       200:
*         description: Redirección realizada correctamente.
*/
app.get('/auth/linkedin', passport.authenticate('linkedin'));

//Se redirige de vuelta a la web, verificación de login y activacion de estrategia
/**
* @openapi
* /auth/linkedin/callback:
*   get:
*     tags: 
*       - Login
*     summary: Gestiona la redirección de vuelta a la aplicación web y activación de estrategia.
*     description: Gestiona la redirección de vuelta a la aplicación web, verificación de login y activacion de estrategia.
*     responses: 
*       200:
*         description: Redirección y login realizados con éxito.
*/
app.get('/auth/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, info) => {
   if (err || !user) {
    // Si el usuario cancela el permiso
    return res.redirect(`${process.env.REACT_PAGE}:3000`);
   }
   req.login(user, (err) => { 
    if (err) { return next(err); }
    //Si el usuario da permiso 
    res.redirect(`${process.env.REACT_PAGE}:3000`);
   });
  })(req, res, next)
});

//Se va a guardar el id del usuario para la cookie
passport.serializeUser((user, done) => { return done(null, user.id); });
//Se saca de la base de datos el usuario y se puede acceder a ella mediante req.user
passport.deserializeUser((id, done) => { 
   User.findById(id, (err, user) => {return done (null, user.u_name);
})});

//Envia al frontend el valor del usuario
/**
* @openapi
* components:
*   schemas:
*     User:
*       type: string
* 
* 
* @openapi
* /getuser:
*   get:
*     tags: 
*       - Login
*     summary: Obtiene el nombre de usuario.
*     description: Devuelve el nombre de usuario para enviarlo al front. 
*     responses: 
*       200:
*         description: Nombre de usuario recibido con éxito. 
*         content:
*           application/json:
*             schema:
*               type: string
*               $ref: '#/components/schemas/User'
*             example: ZcNJA69bAkceP31
*/
app.get('/getuser' , (req, res) => { 
  res.status(200).send(req.user); 
});

//Se cierra la sesion
/**
* @openapi
* /logout:
*   get:
*     tags: 
*       - Logout
*     summary: Cierra la sesión.
*     description: Cierra la sesión del usuario.
*     responses: 
*       200:
*         description: Se hace logout correctamente.
*/
app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(function (err) {
      if(!err) res.status(200).clearCookie('connect.sid', {path: '/'}).redirect(`${process.env.REACT_PAGE}:3000`);
      else { console.log(err.message); }
    });
});

//Obtiene los ratings de una empresa concreta
/**
* @openapi
* components:
*   schemas:
*     Ratings:
*       type: Array
*
* @openapi
* /getMetrics/{companyName}:
*   get:
*     tags: 
*       - Métricas
*     summary: Obtiene los ratings de una empresa.
*     description: Obtiene los ratings de la empresa pasada como variable de ruta.
*     parameters:
*        - in: path
*          name: companyName
*          description: Nombre de una empresa en minúsculas y sin tildes.
*          type: string
*          required: true
*     responses: 
*       200:
*         description: Se obtiene el array de ratings de una empresa correctamente.
*         content:
*           application/json:
*             schema:
*               type: Array
*               $ref: '#/components/schemas/Ratings'
*             example: [ 8, 8.2 ]
*/
app.get('/getMetrics/:companyName', function(req, res) {

  var companyName = req.params['companyName'];

  Metrics.findOne({ 'company_name' : companyName }, (err, doc) =>{
    if(err) console.log(err.message);
    else if(!doc){
      console.log("No se ha encontrado ninguna empresa.");
      res.status(200).send('');
    }
    else {
      res.status(200).send(doc.rating);
    }
  }); 
});

//Se insertan datos a la colección de datos para gráficas
/**
* @openapi
* components:
*   schemas:
*     chartInfo:
*      type: object
*      properties:
*       type:
*         type: string
*       age:
*         type: string
*       gender:
*         type: string
*       consent:
*         type: string
*
* @openapi
* /charts:
*   post:
*     tags: 
*       - Gráficas
*     summary: Actualiza los datos almacenados para las gráficas.
*     description: Obtiene parámetros relevantes para actualizar los datos que se utilizarán para mostrar las gráficas de usuarios.
*     requestBody:
*         description: Un JSON con los distintos datos de interés de la denuncia
*         content:
*           application/json:
*             schema:
*                type: object
*                $ref: '#/components/schemas/chartInfo'
*             example: { type: género, age: 16-20, gender: femenino, consent: sí }
*     responses: 
*       200:
*         description: Se actualiza la colección de datos para gráficas.
*/
app.post('/charts', function(req, res){
  let age = req.body.age;
  let gender = req.body.gender;
  let type = req.body.type;
  let relacion = req.body.relation;
  
  if(chartUtils.updateChartData('graficaEdad',age) && chartUtils.updateChartData('graficaGenero',gender) &&
    chartUtils.updateChartData('graficaTipo',type) && chartUtils.updateChartData('graficaRelacion', relacion)) 
    res.status(200).json({ message: "Actualizado con éxito."});
  else res.status(500).json({ message: "No se ha podido actualizar la información"});
});


//Obtiene los datos de una gráfica concreta
/**
* @openapi
* /charts/{chartName}:
*   get:
*     tags: 
*       - Gráficas
*     summary: Obtiene los datos de una gráfica.
*     description: Obtiene los datos necesarios para poder mostrar una gráfica en la aplicación.
*     parameters:
*        - in: path
*          name: chartName
*          description: Nombre de la gráfica que se desea buscar
*          type: string
*          required: true
*     responses: 
*       200:
*         description: Se obtienen los datos de la gráfica correctamente.
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/chartInfo'
*             example: { type: género, age: 16-20, gender: femenino, consent: si }
*/
app.get('/charts/:chartName', function(req, res) {

  var chartName = req.params['chartName'];

  Chart.findOne({ 'chart_name' : chartName }, (err, doc) =>{
    if(err) console.log(err.message);
    else if(!doc){
      console.log("No se ha encontrado ninguna gráfica.");
      res.status(200).send('');
    }
    else {
      res.status(200).send(doc.data);
    }
  }); 
});


//Desde este endpoint se puede acceder al documento de swagger que muestra los endpoints
/**
* @openapi
* /swagger:
*   get:
*     tags: 
*       - Documentación
*     summary: Sirve este documento.
*     description: Se usa para poder acceder a este swagger.
*     responses: 
*       200:
*         description: Swagger cargado con éxito.
*         content:
*           application/json:
*             schema:
*               type: string
*/
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));


//Se realiza el scrapping todos los días a las 12 de la noche.
cron.schedule('0 0 * * *', ()=>{
  console.log("Iniciando scraping diario...");
  
  let options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: './scraper',
    args: [`${process.env.MONGO_START}${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_STREAM}`]
  };

  PythonShell.run('metric_scraper.py', options, function (err, results) { 
    if(!err) console.log("Scraping finalizado con éxito.");
    else console.log("Se ha producido un error durante el scraping.");
  }); 
});
