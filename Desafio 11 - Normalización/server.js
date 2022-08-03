const express = require('express');
const app = express();
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const handlebars = require('express-handlebars');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)
const PORT = process.env.PORT || 8080;
const apiContenedor = require('./utils/apiContenedor.js')
const indexRoutes = require('./routes/indexRoutes')
const apiRoutes = require('./routes/apiRoutes')
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'main.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use('/', indexRoutes)
app.use('/api', apiRoutes)

const productos = apiContenedor.generarProducto()
const mensajes = apiContenedor.generarMensajes()
//Socket
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado')
    socket.emit('messages', mensajes)
    socket.emit('productos', productos)

    socket.on('new-message', async data => {
        apiContenedor.guardarMensaje(data)
        io.sockets.emit('messages',  await apiContenedor.obtenerMensajes())
    })

    socket.on('new-product', data => {
        io.sockets.emit('productos', apiContenedor.insertarProducto(data))
    })
})
httpServer.listen(PORT, () => { console.log("Se inicio el servidor en el puerto N° " + PORT) })
