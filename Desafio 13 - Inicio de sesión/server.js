const express = require('express');
const app = express();
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const handlebars = require('express-handlebars');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)
const PORT = process.env.PORT || 8080;
const apiContenedor = require('./utils/apiContenedor.js')
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/apiRoutes')
const session = require('express-session');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');
const passport = require('passport');

const router = require('./routes/router');


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
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 100000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(express.static('views'));
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');
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
const server = httpServer.listen(PORT, async () => {
    await mongoose.connect('mongodb+srv://Seba:Seba123@cluster0.coymqb5.mongodb.net/?retryWrites=true&w=majority');
    console.log(`Server running on port ${PORT}`);
});
server.on('error', err => console.log(`Error: ${err}`));