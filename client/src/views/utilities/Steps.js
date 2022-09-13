import logo from 'assets/images/fdi_logo.png'

export const steps= [
    {
      content:(
        <div>
          <img height = '50rem' src={logo} />
          <h4>Bienvenida/o a la</h4>
          <h2>Plataforma Blockchain para denunciar discriminaciones sociales de las empresas</h2>
          <p>Cuenta tu historia, ayuda al resto.</p>
          <p>Hagamos que las historias no solo queden en eso.</p>
          <p>🟣 D 🔵 E 🟣 N 🔵 U 🟣 N 🔵 C 🟣 I 🔵 A 🟣</p> 
        </div>
      ) ,
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás' , last: 'Fin' },
      styles: {
        options: {
          arrowColor: ' #0a2d58 ',
          backgroundColor: '   #0a2d58    ',
          textColor: '#FFFFFF',
          width: 450,
        },
      },
      placement: 'center',
      disableBeacon: true,
      target: 'body',
    },
    {
      content: <p>Al hacer click sobre este botón, accederás a un formulario de denuncia desde el que podrás contar tu historia.</p>,
      floaterProps: {
        disableAnimation: true,
      },
      styles: {
        options: {
          arrowColor: ' #0a2d58 ',
          backgroundColor: '   #0a2d58    ',
          textColor: '#FFFFFF',
        },
      },  
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás'  },

      target: '.denunciar div',
      title: 'Formulario de denuncia',
      scrollOffset: 0,
    },
  
    {
      content: (
        <p>Desde la página de cada empresa podrás ver su reputación y las denuncias de esta que se han registrado.</p>
      ),
      placement: 'top',
      //spotlightPadding: 20,
      scrollOffset: 50,
      styles: {
        options: {
          arrowColor: ' #0a2d58 ',
          width: 300,
          backgroundColor: '   #0a2d58    ',
          textColor: '#FFFFFF',   
        },

      },
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás'  },
      target: '.empresa div',
    },
    {
      content: (
        <div>
          <p>Pulsando en este botón accedemos a la información sobre el proyecto.</p>
          <p>Allí podrás ayudar a pagar el coste de publicar las denuncias en la Blockchain mediante una donación.</p>
          <p>📣 🗣 Donando das voz a los denunciantes 🗣 📣</p> 
          <p>También podrás conocer cómo calculamos la reputación</p> 
        </div>
        ),
      locale: { skip: <strong aria-label="skip">Cerrar</strong>, next: 'Siguiente', back: 'Atrás' , last: 'Fin'},

      styles: {
        options: {
          arrowColor: ' #0a2d58 ',
          width: 500,
          backgroundColor: '  #0a2d58   ',
          textColor: '#FFFFFF',
        },
      },
      
      title: 'Información del Proyecto',
      placement: 'left',
      disableBeacon: true,
      target: '.informacion div',

    },
  ];