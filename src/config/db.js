const Pool = require("pg").Pool;
const pool = new Pool({
    user:'postgres', // default postgres
    host:'localhost',
    database:'endemondb', // `my_todos_db`
    password:'postgres', //added during PostgreSQL and pgAdmin installation
    port:'5432' //default port
});

module.exports = pool;