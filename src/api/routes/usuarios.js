import express from "express";
const routerUsuarios = express.Router();

//import the controller
import UsuarioController from "../controllers/UsuarioController.js";

//Get all casos.
routerUsuarios.get("/list", async (req, res) => {
  let usuarios = await new UsuarioController().getUsuarios();
  res.status(200).json(usuarios);
});

// http://localhost:4000/usuario/validalogin?login=teste&senha=teste
// routerUsuarios.post("/usuario/validalogin", async (req, res) => {
//   console.log(req.body);
//   let { login, senha } = req.body;
//   let usuario = await new UsuarioController().validaLogin(login, senha);
//   res.status(200).json(usuario);
// });

//module.exports = routerUsuarios;
export default routerUsuarios;
