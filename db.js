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

const query = `
CREATE TABLE users (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);
`;