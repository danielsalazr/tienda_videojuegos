const {Client} = require('pg');
const config = require('./config');

const  dbconf = new Client({ 
    host: config.postgresql.host,
    user : config.postgresql.user,
    password: config.postgresql.password,
    database: config.postgresql.database,
    port:5432,
})

let conection;

conection = dbconf.connect()



function list(table) {
    const Consulta = `
        select * from videojuegos;
    `;
    dbconf.query(Consulta, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Consulta realizada');
        console.log(res.rows)
        dbconf.end();
        return res.rows
    });

}

list()
module.exports = {
    list,
};