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



function listadoJuegos(param) {
        return new Promise( (resolve, reject) => {
            const consulta = `
                select * from videojuegos order by ${param};
            `;
            dbconf.query(consulta, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data.rows);
                return data.rows;
            });
        })
}

function detalleJuego(param) {
    return new Promise( (resolve, reject) => {
        const consulta = `
            select * from videojuegos where titulo = '${param}';
        `;
        dbconf.query(consulta, (err, data) => {
            if (err) {
                return reject(err);
            }
            if(data.rows.length == 0) 
            {
                resolve("lo sentimos su busqueda no es valida");
            };
            console.log(data.rows)
            resolve(data.rows);
            return data.rows;
        });
    })
}

function juegosEmpresa(param) {
    return new Promise( (resolve, reject) => {
        const consulta = `
            select * from videojuegos where empresa = '${param}' order by titulo;
        `;
        dbconf.query(consulta, (err, data) => {
            if (err) {
                return reject(err);
            }
            if(data.rows.length == 0) 
            {
                resolve("lo sentimos, la empresa que ingreso no existe en la base de datos");
            };
            console.log(data.rows)
            resolve(data.rows);
            return data.rows;
        });
    })
}


function nuevoTitulo(info) {
    //console.log(info);
    return new Promise( (resolve, reject) => {
        const i = info;
        const consulta = `
        INSERT INTO videojuegos(titulo, stock, empresa, estreno, plataforma, precio) VALUES ('${i.titulo}', ${i.stock},'${i.empresa}','${i.estreno}', '${i.plataforma}', ${i.precio});
        `;
        dbconf.query(consulta, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data.rows);
            return data.rows;
        });
    })
}

function compra(info, cantidad) {
    //console.log(info);
    return new Promise( (resolve, reject) => {
        const i = info;
        const consulta = `
        INSERT INTO public.ventas(cantidad, titulo, precio_total) VALUES ( ${cantidad}, '${i[0].titulo}', ${i[0].precio});
        `;
        dbconf.query(consulta, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data.rows);
            return data.rows;
        });
    })
}

function ActualizarInventario(titulo, cantidad) {
    //console.log(info);
    return new Promise( (resolve, reject) => {
        const consulta = `
        UPDATE public.videojuegos SET  stock=${cantidad} WHERE titulo = '${titulo}';
        `;
        console.log(consulta)
        dbconf.query(consulta, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data.rows);
            return 1;
        });
    })
}


//nuevoTitulo()
//list()
module.exports = {
    listadoJuegos,
    nuevoTitulo,
    detalleJuego,
    juegosEmpresa,
    compra,
    ActualizarInventario,
};