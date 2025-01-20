const jwt = require('jsonwebtoken');
const {secret} = require ('../crypto/config')

//Creamos las funciones para generar y verificar el token
function generateToken(user) {
    return jwt.sign({ user: user.id }, 'tu_secreto_es_secreto', {
      expiresIn: '1h',
    });
  }
  
  //Función que verifica el token
  function verifyToken(req, res, next) {
    const token = req.session.token;
    if (!token) {
      return res.status(401).json({ mensaje: 'token no proporcionado' });
    }
  
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
        req.user = decoded.user;
        next();
    });
}

  

  module.exports = {verifyToken, generateToken};