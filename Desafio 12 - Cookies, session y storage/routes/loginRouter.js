const express = require('express');
const router = express.Router();
let loginController = require("../controllers/loginController.js");

router.get('/', loginController.login);
router.post('/', loginController.crearLogin);


module.exports = router;