const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Se define el esquema que representa a un usuario en la aplicacion
const UserSchema = new Schema({
  l_id :{ type : String, required : true, unique : true},
  u_name : { type : String, required : true, unique : true}
  
}, { collection : 'userInfo' });

//Se define el modelo
const User = new mongoose.model('userInfo', UserSchema);
module.exports = User;