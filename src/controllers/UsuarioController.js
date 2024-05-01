import prisma from "../config/client.js";

class UsuarioController {
  async getUsuarios() {
    let results = await prisma.usuario.findMany();
    return results;
  }

  async validaLogin(login, senha) {
    let results = await prisma.$queryRaw(`SELECT codusu, logusu FROM usuario
    where logusu = ${login} and senusu = ${senha}`);
    return results;
  }
}

export default UsuarioController;
