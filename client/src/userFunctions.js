

//Nos conectamos con el endpoint que nos llevará a la página de inicio de sesion de LinkedId
export const verifyLinkedIn = () => { window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/linkedin`};

//Delegamos al servidor el cierre de sesion
export const logOut = () => { window.location.href = `${process.env.REACT_APP_SERVER_URL}/logout`};