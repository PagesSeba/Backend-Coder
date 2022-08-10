const express = require('express');
const router = express.Router();
let apiController = require("../controllers/apiController.js");

router.get('/productos-test', apiController.listar);

module.exports = router;