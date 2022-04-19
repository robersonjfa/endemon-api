const db = require("../config/db");

class Caso {
  //get all todos.
  async getCasos() {
    let results = await db.query(`SELECT * FROM caso`).catch(console.log);
    return results.rows;
  }

  //create caso.
  async createCaso(caso) {
    await db
      .query("INSERT INTO caso (codpes, latcas, lngcas) VALUES ($1, $2, $3)", [caso.pessoa, caso.latitude, caso.longitude])
      .catch(console.log);
    return;
  }

  //update caso.
  async updateCaso(casoId) {
    //get the previous caso.
    let original_caso = await db
      .query(`SELECT * FROM caso WHERE id=$1`, [parseInt(casoId)])
      .catch(console.log);
    let new_checked_value = !original_caso.rows[0].checked;

    //update the checked caso
    await db
      .query(`UPDATE caso SET codpes=$1, latcas=$2, lngcas=$3 WHERE codcas=$2`, [new_checked_value,parseInt(todoId),])
      .catch(console.log);
    return;
  }

  //delete a caso.
  async deleteCaso(casoId) {
    await db.query(`DELETE FROM caso WHERE codcas=$1`, [parseInt(casoId)]).catch(console.log);
    return;
  }
}

module.exports = Caso;