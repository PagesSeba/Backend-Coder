const {Router} = require("express");
const { addCart, deleteCart, getProducts, addProductToCart, deleteProduct } = require("../controllers/controllerCart.js");
const routerCarts = Router();

routerCarts.post('/', (req, res) => addCart(req, res));

routerCarts.delete('/:id', (req, res) => deleteCart(req, res));

routerCarts.get('/:id/productos', (req, res) => getProducts(req, res));

routerCarts.post('/:id/productos/:id_prod', (req, res) => addProductToCart(req, res));

routerCarts.delete('/:id/productos/:id_prod', (req, res) => deleteProduct(req, res));

module.exports = routerCarts;