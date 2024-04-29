import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import path from 'path';
// dotenv.config({path: path.resolve('.env')});

import authenticationToken from "./middleware/AuthenticationToken.js";
import cookieParser from "cookie-parser";
import authController from "./controllers/AuthController.js";

//import the routes
import routerCasos from "./routes/casos.js";
import routerUsuarios from "./routes/usuarios.js";

// Use express JSON middleware
app.use(bodyParser.json());

// Use express URL-ENCODED middleware
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" || !process.env.NODE_ENV
        ? "http://localhost:5173"
        : process.env.FRONT_URL,
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
  );
  
  next();
});

//configure the app.
app.get("/", (req, res) => {
  res.send("Endemon-API");
});

// Use cookie parser
app.use(cookieParser());

// Controller
app.use("/auth", authController);

//configure the app.
app.use("/casos", authenticationToken, routerCasos);
app.use("/usuarios", authenticationToken, routerUsuarios);

// app.use("*", (_, res) => {
//   res.status(404).json({
//     statusCode: 404,
//     message: "Resource Not Found",
//   });
// });

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
