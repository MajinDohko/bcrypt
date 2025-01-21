const jwt = require('jsonwebtoken');
const {hashedSecret} = require ('../crypto/config')

//Creamos las funciones para generar y verificar el token
function generateToken(user) {
    return jwt.sign({ user: user.id }, hashedSecret, {
      expiresIn: '1h',
    });
  }
  
  //Función que verifica el token -> este es el middleware ya que siempre hay que pasar por aquí para verificar el token y dejar paso o no
  function verifyToken(req, res, next) {
    const token = req.session.token;
    if (!token) {
      return res.status(401).json({ mensaje: 'token no proporcionado' });
    }
  
    jwt.verify(token, hashedSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
        req.user = decoded.user;
        next();
    });
}

  

  module.exports = {verifyToken, generateToken};