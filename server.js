const express = require("express");
const routerProducts = require( './routes/routerProducts.js');
const routerCarts = require ('./routes/routerCart.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarts);
app.use('*', (req, res) => {
	const path = req.params;
	const method = req.method;
	res.send({ error: -2, descripcion: `ruta '${path[0]}' método '${method}' no implementada` });
});

const server = app.listen(PORT, () => console.log(`Servidor HTTP abierto en puerto: ${PORT}`));
server.on('error', err => console.log(err));