import express from "express";
const routerCasos = express.Router();

//import the controller
import CasoController from "../controllers/CasoController.js";

//Get all casos.
routerCasos.get("/list", async (req, res) => {
  let casos = await new CasoController().getCasos();
  res.status(200).json(casos);
});

//Create a caso.
routerCasos.post("/create", async (req, res) => {
  let { pessoa, latitude, longitude } = req.body;
  console.log(req.body);
  await new CasoController().createCaso({ pessoa, latitude, longitude }, res);
  res.status(200).json("OK");
});

//Update a caso.
routerCasos.put("/update/:casoId", async (req, res) => {
  let { casoId } = req.params;
  await new CasoController().updateCaso(casoId, res);
  let casos = await new Caso().getCasos();
});

//Delete a todo.
routerCasos.delete("/delete/:casoId", async (req, res) => {
  let { casoId } = req.params;
  await new CasoController().deleteCaso(casoId);
  let casos = await new Caso().getCasos();
  res.status(200).json(casos);
});

//module.exports = routerCasos;
export default routerCasos;
