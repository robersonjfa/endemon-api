import express from "express";
import { validationResult, body } from "express-validator";
import authService from "../service/AuthService.js";
import jwt from "../service/JwtService.js";
//import dotenv from "dotenv";
//dotenv.config({path: '../.env'});

const authController = express.Router();

authController.post(
  "/login",
  body("username")
    .isString()
    .withMessage("Usuário precisa ser string")
    .notEmpty()
    .withMessage("Usuário não pode estar vazio"),
  body("password")
    .isString()
    .withMessage("Senha precisa ser string")
    .notEmpty()
    .withMessage("Senha não pode estar vazia"),
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0)
      return res.status(400).json({
        statusCode: 400,
        message: "Algumas entradas precisam de correção.",
        errors: errors,
      });

    try {
      const { accessToken, refreshToken, username } =
        await authService.handleLogin(req.body.username, req.body.password);

      res.cookie("refresh", refreshToken, {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(200).json({ accessToken, username: username });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        statusCode: 401,
        message: "Usuário e/ou senha inválido ...",
      });
    }
  }
);

authController.get("/refresh", async (req, res) => {
  const currentRefreshToken = req.cookies.refresh;

  if (!currentRefreshToken)
    return res
      .status(403)
      .json({ statusCode: 403, message: "You're forbidden from doing that." });

  try {
    const isRefreshTokenValid = await jwt.verify(currentRefreshToken);
    const payload = {
      username: isRefreshTokenValid.username,
    };
    const newAccessToken = await jwt.sign(payload, "30s");

    /**
     * This sets a session cookie that will expire when user closes session.
     * Next time the user needs to be authenticated they will get new token by /refresh GET request.
     */

    return res.status(201).json({
      statusCode: 201,
      message: "Access token criado!",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ statusCode: 403, message: "Você está proibido de realizar a operação." });
  }
});

authController.post("/logout", (_, res) => {
  res.cookie("refresh", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res
    .status(204)
    .json({ statusCode: "204", message: "Logout realizado com sucesso!" });
});

export default authController;