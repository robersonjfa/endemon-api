import prisma from "../config/client.js";

class CasoController {
  //get all todos.
  async getCasos() {
    let results = await prisma.caso.findMany();
    return results;
  }

  //create caso.
  async createCaso(caso) {
    await prisma.caso.create({ data: caso });
    return;
  }

  //update caso.
  async updateCaso(casoId) {
    let new_checked_value = !original_caso.rows[0].checked;
    //update the checked caso
    prisma.caso.update({ where: { id: casoId }, data: new_checked_value });

    return;
  }

  //delete a caso.
  async deleteCaso(casoId) {
    await prisma.caso.delete({ where: { id: casoId } });
    return;
  }
}

export default CasoController;