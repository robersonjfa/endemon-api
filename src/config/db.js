const Pool = require("pg").Pool;
const pool = new Pool({
    user:'grdrdnrxqrcybu', // default postgres
    host:'ec2-34-194-158-176.compute-1.amazonaws.com',
    database:'d9jhe8j4glicrj', // `my_todos_db`
    password:'8104eca22600b25c39021446f29b26b3f307d5c9b8c1526c6ece139ba9eff66b', //added during PostgreSQL and pgAdmin installation
    port:'5432' //default port
});

module.exports = pool;