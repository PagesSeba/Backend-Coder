const {
    Router
} = require('express');
const router = Router();
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

router.get('/', (req, res) => {
    
        res.render('prod', {productos});
})



router.post('/', (req, res) => {
    
    let nuevoProducto = req.body
    let newId
    if (productos.length == 0) {
        newId = 1
    } else {
        newId = productos[productos.length - 1].id
        newId++
    }
    const nuevaLista = { ...nuevoProducto, id: newId }
    productos.push(nuevaLista)
    res.redirect('/')
})


router.get('/:id', (req, res) => {
    
    let data = productos.find(producto => producto.id == req.params.id);
    data ? res.json(data) : res.json({error: 'No existe ese ID'})
    })

 

router.put('/:id', (req, res) => {
try{
    const id = Number(req.params.id);
    const index = productos.findIndex(producto => producto.id === id)
    const oldProd = productos[index]

  
    if (productos.find((prod) => prod.id === id)) {
      productos[index] = req.body;
      productos[index].id = id;

      res.json(
        `${JSON.stringify(oldProd)}   ha sido actualizado a:  ${JSON.stringify(
          productos[index]
        )}`
      );
    } else {
      res.json(`El producto con el id: ${id} no existe`);
    }
}catch(error){
    console.log('ha ocurrido un error en el put')
}
})


router.post('/eliminar/:id', (req, res) =>{
    
    try{
    const index = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (index === -1) {
        res.status(404)
    } else {
        productos.splice(index, 1);
        res.redirect('/productos')
    }
    }catch(error){
        console.log('ha ocurrido un error en el DELETE')
    }
})





module.exports = router;