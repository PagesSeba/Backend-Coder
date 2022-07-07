const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const expressServer = app.listen(PORT, () => {
    try{
        console.log(`Servidor HTTP está escuchando el puerto: ${PORT}`)
    }
    catch(error){
        console.log("Error al iniciar: ", error);
    }
});


const { Server: IOServer } = require('socket.io');
const io = new IOServer(expressServer);


const arrayMsg = [];
const productos = [
    {
        "id": 1,
        "url": "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/672/177/products/celeste1-85db98b8d9c6eba4cd16455527422469-640-0.png",
        "price": 9000,
        "name": "Camiseta Belgrano"
    },
    {
        "id": 2,
        "url": "https://todosobrecamisetas.com/wp-content/uploads/camisetas-givova-talleres-2022-4.jpg",
        "price": 8750,
        "name": "Camiseta Talleres"
    },
    {
        "id": 3,
        "url": "https://newsport.vteximg.com.br/arquivos/ids/3575839-1000-1000/2001-a.jpg?v=637503979277900000",
        "price": 7600,
        "name": "Camiseta Instituto"
    }];


const Container = require('./container.js');
messagesRecord = new Container;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../public')));


io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id);


    socket.emit('server:products', productos);
    socket.on('client:product', productoInfo => {
        productos.push(productoInfo);
        io.emit('server:products', productos);
    })


    socket.emit('server:msgs', arrayMsg);
    socket.on('client:msg', infoMsg => {
        arrayMsg.push(infoMsg);
        messagesRecord.save(infoMsg);
        io.emit('server:msgs', arrayMsg)
    })
})


