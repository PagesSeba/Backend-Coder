const express = require('express');
const { Router } = express;

const PORT = 8080;
const app = express();
const router = Router();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const productos = [{
    title: "Camiseta Belgrano",
    price: 9000,
    thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/672/177/products/celeste1-85db98b8d9c6eba4cd16455527422469-640-0.png",
    id: 1
}, {
    title: "Camiseta Talleres",
    price: 8750,
    thumbnail: "https://todosobrecamisetas.com/wp-content/uploads/camisetas-givova-talleres-2022-4.jpg",
    id: 2
}, {
    title: "Camiseta Instituto",
    price: 7560,
    thumbnail: "https://newsport.vteximg.com.br/arquivos/ids/3575839-1000-1000/2001-a.jpg?v=637503979277900000",
    id: 3
}]

router.get('/productos', (req, res) => {
    res.json(productos)
})

router.post('/productos', (req, res) => {
    let productoIngresado = req.body

    let idNewProd
    if (productos.length == 0) {
        idNewProd = 1
    } else {
        idNewProd = productos[productos.length - 1].id
        idNewProd++
    }
    console.log(idNewProd)
    const nuevaLista = { ...productoIngresado, id: idNewProd }
    productos.push(nuevaLista)
    res.json(nuevaLista)
})

router.get('/producto/:id', (req, res) => {

    let id = req.params.id;
    let producto = productos.find((item) => item.id == id)
    if (!producto) {
        res.json({ error: 'producto no encontrado' })
    } else {
        res.json(producto)
    }
})

router.put('/producto/:id', (req, res) => {

    let id = req.params.id;
    let producto = productos.find((item) => item.id == id)
    if (!producto) {
        res.json({ error: 'producto no encontrado' })
    } else {
        producto.title = req.body.titulo
        producto.price = req.body.precio
        producto.thumbnail = req.body.thumbnail
        res.json(producto)
    }
})

router.delete('/producto/:id', (req, res) => {
    let id = req.params.id;
    let data = productos.findIndex((item) => item.id == id)
    if (data == -1) {
        console.log('No se encontro ningun producto con ese Id')
    } else {
        productos.splice(data, 1)
        res.redirect('/api/productos')
    }
})


app.use('/api', router)

const server = app.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto ' + PORT);
});


