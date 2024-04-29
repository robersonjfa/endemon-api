import bcrypt from "bcrypt";
import prisma from "../config/client.js";
import jwtService from "./JwtService.js";

class AuthService {
  static async handleLogin(username, password) {
    const foundUser = await prisma.usuario.findFirst({
      where: {
        logusu: {
          equals: username.toLowerCase(),
        },
      },
    });

    if (!foundUser) throw new Error("User not found");

    const arePasswordsOk = await bcrypt.compare(password, foundUser.senusu);
    if (!arePasswordsOk) throw new Error("Wrong password");

    const accessToken = await jwtService.sign(
      { username: foundUser.logusu },
      "600s"
    );
    const refreshToken = await jwtService.sign(
      { username: foundUser.logusu },
      "365d"
    );
    return { accessToken, refreshToken, username: foundUser.logusu };
  }
}

export default AuthService;
