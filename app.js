//Creamos el servidor con lo necesario para su funcionamiento
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const {router} = require('./routes/users');
const PORT = 3000;

// Acceso a los middlewares
app.use(bodyParser.urlencoded({ extended: true }));//al utilizar express se puede utilizar express.urlencoded en vez de bodyParser.urlencoded
app.use(
    session({
        secret: 'tu_secreto_es_secreto', //clave secreta para geb
        resave: false,
        saveUninitialized: true, //true para guardar la sesion
        cookie: { secure: false },
    })
);

// Importamos las rutas
app.use('/', router);

// Iniciamos el servidor que nos permite pulsar en el link
app.listen(PORT, () => {
    console.log(`Express está escuchando en: http://localhost:${PORT}`);
});