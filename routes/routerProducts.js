const { Router } = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/controllerProducts.js");
const routerProducts = Router();
const reqAdmin = require("../utils/adminCheck");
const admin = true;
const checkAdmin = reqAdmin(admin)

routerProducts.get('/:id?', (req, res) => getProducts(req, res));

routerProducts.post('/', checkAdmin, (req, res) => addProduct(req, res));

routerProducts.put('/:id', checkAdmin, (req, res) => updateProduct(req, res));

routerProducts.delete('/:id', checkAdmin, (req, res) => deleteProduct(req, res));

module.exports = routerProducts;