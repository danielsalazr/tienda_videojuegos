const express = require('express');
const app = express();
const server = require('http').Server(app);

const config = require ('./config')

const cors = require('cors');
const bodyParser = require('body-parser');
//const socket = require('./socket')
//const router = require('./components/message/network'); // importando router desde components/message/network.js
//const db = require('./db')
//const router = require('./network/routes');


//db(config.dbUrl);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
//app.use(router); // el router ahora se encuentra en /components/message/network.js 

//socket.connect(server);

router(app); // configuracion del servidor para pasarle las rutas desde network/routes.js

app.use( config.publicRoute, express.static('public')); //Servir archivos estaticos en la carpeta public

server.listen(config.api.port, function () {
    console.log('La aplicacion esta escuchando en '+config.host+':'+config.port)
});
