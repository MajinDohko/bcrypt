//Configuramos lo necesario para poder crear las rutas
const express = require('express');
const users = require('../data/users');
const { verifyToken, generateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

//Creamos las rutas
router.get('/', (req, res)=>{
    if(req.session.token){
        return res.redirect('/dashboard')
    }
    const loginForm = `
  <form action="/login" method="post">
    <label for ="username">Usuario:</label>
    <input type="text" id="username" name="username" required><br>
    
    <label for ="password">Contraseña:</label>
    <input type="password" id="password" name="password" required><br>
    
    <button type="submit">Iniciar Sesión</button>
  </form>
  <a href="/dashboard">dashboard</a>
  `;

  res.send(loginForm);
});

//Creamos la ruta para iniciar sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) { 
        const token = generateToken(user); 
        req.session.token = token; //guardo el token en el session del usuario
        res.redirect('/dashboard');
    } else {
        res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
});

    //Ruta para ir al dashboard
  router.get('/dashboard', verifyToken, (req, res) => {
    const userId = req.user;
    const user = users.find((user) => user.id === userId);
    if (user) {
      res.send(`
      <h1>Bienvenido, ${user.name}</h1>
      <p>ID: ${user.id}</p>
      <p>UserName: ${user.username}</p>
      <a href="/">Home</a>
      <form action="/logout" method="post">
      <button type="submit">Cerrar Sesión</button>
      </form>
      `);
    } else {
      res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }
  });

  // Ruta para cerrar sesión
  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  module.exports = {router};