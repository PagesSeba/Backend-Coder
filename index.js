const express = require('express');
const { Router } = express;

const PORT = 8080;
const app = express();
const router = Router();




app.use('/api', router)

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT);
});


