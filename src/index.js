const express = require("express");
const cors = require("cors");
const app = express();

//import the routes
const rotasCasos = require('./routes/casos');

app.use(express.json());
app.use(cors());

//configure the app.
app.use(rotasCasos);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app started on port ${PORT}`)
});