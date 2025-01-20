//Creamos el servidor con lo necesario para su funcionamiento
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const {router} = require('./routes/users');
const PORT = 3000;

// Acceso a los middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'tu_secreto_es_secreto', 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

// Importamos las rutas
app.use('/', router);

// Iniciamos el servidor que nos permite pulsar en el link
app.listen(PORT, () => {
    console.log(`Express está escuchando en: http://localhost:${PORT}`);
});