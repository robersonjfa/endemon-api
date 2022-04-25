const express = require("express");
const cors = require("cors");
const app = express();

//import the routes
const rotasCasos = require('./routes/casos');
const rotasUsuarios = require('./routes/usuarios');

app.use(express.json());
app.use(cors());

//configure the app.
app.get("/", (req, res) =>{
    res.send("EndemonAPI");
});

//configure the app.
app.use(rotasCasos);
app.use(rotasUsuarios);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});