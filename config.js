module.exports = {
    api: {
        port: process.env.API_PORT || 3002 ,
    },
    publicRoute : process.env.PUBLIC_ROUTE  || '/app',
    host: process.env.HOST || 'http://localhost',
    postgresql : {
        host: process.env.MYSQL_HOST || 'localhost',
        user:  process.env.MYSQL_USER || 'postgres',
        password :  process.env.MYSQL_PASS || '12345678',
        database :  process.env.MYSQL_DB || 'tienda',
        

    }

    
}
