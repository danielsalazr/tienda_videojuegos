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
    

        return new Promise( (resolve, reject) => {
            const Consulta = `
                select * from videojuegos;
            `;
            dbconf.query(Consulta, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data.rows);
                return data.rows;
                console.log(data.rows)
            });
        })
    

}

//list()
module.exports = {
    list,
};