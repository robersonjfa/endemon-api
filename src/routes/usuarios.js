const express = require("express");
const router = express.Router();

//import the controller
const Usuario = require('../controllers/Usuario');

//Get all casos.
router.get('/usuarios', async (req, res) => {
    let usuarios = await new Usuario().getUsuarios();
    res.status(200).json(usuarios);
});

// http://localhost:4000/usuario/validalogin?login=teste&senha=teste
router.post('/usuario/validalogin', async (req, res) => {
    console.log(req.body);
    let { login, senha } = req.body
    let usuario = await new Usuario().validaLogin(login, senha);
    res.status(200).json(usuario);
});

module.exports = router;