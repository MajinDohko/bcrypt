//Creo los usuarios como en el ejercicio del workout para probar que funcionen más tarde
const bcrypt = require('bcrypt');
const users = [
    { id: 1, username: 'usuario1', password:  bcrypt.hashSync('contraseña1', 10), name: 'Usuario Uno' },
    {
      id: 2,
      username: 'usuario2',
      password:  bcrypt.hashSync('contraseña2', 10),
      name: 'Usuario Dos',
    },
  ];

  module.exports = users;
