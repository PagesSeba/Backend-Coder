const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const Container = require('./container.js');
const { optionsMariaDB, optionsSQLite3 } = require('./options/config.js');


const PORT = 8080;
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const camiseta = new Container(optionsMariaDB, 'camiseta');
const ClienteSQLITE = require('./createTableMsgs.js')

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    res.render('form');
});

io.on('connection', async socket => {
    console.log('Conexión establecida');
    const dbCamiseta = await camiseta.getAll();
    io.sockets.emit('camiseta', dbCamiseta);
    socket.on('camiseta', async product => {
        camiseta.save(product);
        const dbCamiseta = await camiseta.getAll();
        io.sockets.emit('camiseta', dbCamiseta);
    })
});

const sqlite = new ClienteSQLITE(optionsSQLite3)

const messages = [
    { correo: "Test1@gmail.com", date: new Date().toLocaleString("fr-FR"), message: "¡Hola!" },
    { correo: "TestMail2@gmail.com", date: new Date().toLocaleString("fr-FR"), message: "¡Hola! ¿Como Andas?" }
]

let sqlite3Inicio = async function sqlite3Inicio() {
    await sqlite.crearTabla()
    console.log('Tabla creada')
    await sqlite.insertarMensajes(messages)
    console.log('Se insertaron los mensajes')
}
sqlite3Inicio()

io.on('connection', (socket) => {

    sqlite.obtenerMensajes()
        .then((messages) => {
            socket.emit('messages', messages)
        })
        .catch((err) => { console.log(err) })

    socket.on('new-message', data => {
        sqlite.insertarMensajes(data)
        .then(() => {
            return sqlite.obtenerMensajes()
        })
        .then((messages) => {
            io.sockets.emit('messages', messages)
        })
        .catch((err) => { console.log(err) })

    })
})


const server = httpserver.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', () => console.log(`Error: ${err}`));