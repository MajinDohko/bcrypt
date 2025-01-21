//Configuro crypto para su funcionamiento
const crypto = require ('crypto');
const bcrypt = require('bcrypt');

//estas 2 líneas hacen que nuestro secreto sea seguro
const secret = crypto.randomBytes(64).toString('hex');//genera clave aleatoria
const hashedSecret = bcrypt.hashSync(secret, 10);//encripta esa clave aleatoria

//Exporto los modulos para poder usarlos en otras rutas
module.exports = {secret, hashedSecret};