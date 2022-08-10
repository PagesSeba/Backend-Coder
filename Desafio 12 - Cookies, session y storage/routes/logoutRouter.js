const express = require('express');
const router = express.Router();
let logoutController = require("../controllers/logoutController.js");


router.get('/', logoutController.cerrarLogin);


module.exports = router;