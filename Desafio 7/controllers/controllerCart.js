const Container = require("./container.js");

const carts = new Container('./data/carts.json');

const addCart = (req, res) => {
	const products = req.body;
	if (!products) return carts.save([]);
	carts.save(products);
	res.json({ message: 'Carrito agregado' });
}

const deleteCart = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
	const cartDeleted = carts.deleteById(id);
	if (cartDeleted === -1) return res.status(404).json({ message: 'El ID no pertenece a un carrito listado' });
	res.json({ message: 'Carrito eliminado' });
}

const getProducts = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
	const cartSelected = carts.getById(id);
	if (cartSelected == null) return res.status(404).send({ message: 'Ingresa el ID de un carrito listado' });
	res.json({ 'Productos': cartSelected.products });
}

const addProductToCart = (req, res) => {
	const id = Number(req.params.id);
	const id_prod = Number(req.params.id_prod);
	if (isNaN(id) || isNaN(id_prod)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
	const productSaved = carts.saveProduct(id, id_prod);
	if (productSaved == null || !productSaved) return res.status(404).send({ message: 'Error al intentar agregar un producto al carrito' });
	res.json({ message: 'Producto cargado' });
}

const deleteProduct = (req, res) => {
	const id = Number(req.params.id);
	const id_prod = Number(req.params.id_prod);
	if (isNaN(id) || isNaN(id_prod)) return res.status(400).send({ message: 'Ingresa el ID de un carrito listado' });
	const productDeleted = carts.deleteProduct(id, id_prod);
	if (productDeleted == -1 || !productDeleted) return res.status(404).send({ message: 'Error al intentar borrar un producto del carrito' });
	res.json({ message: 'Producto eliminado' });
}

module.exports = { addCart, deleteCart, getProducts, addProductToCart, deleteProduct };