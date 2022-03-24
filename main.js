const express = require('express');
const app = express();
const server = require('http').Server(app);

const config = require ('./config')

const cors = require('cors');
const bodyParser = require('body-parser');
//const socket = require('./socket')
//const router = require('./components/message/network'); // importando router desde components/message/network.js
const db = require('./db')
const router = express.Router();
//const router = require('./network/routes');

app.use(cors());

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended : false}));
//app.use(router); // el router ahora se encuentra en /components/message/network.js 


//app.use( config.publicRoute, express.static('/public'));
app.use(express.static('public')); //Servir archivos estaticos en la carpeta public
app.get('/',function(req, res) {
    res.send('Bienvenido a tu tienda online')
})


app.get('/juegos', function(req, res) {

    let orden = 'titulo';

    console.log(req.query)
    const consulta = req.query.orden
    if (consulta == 'stock') orden='stock';
    else if (consulta == 'empresa') orden='empresa';
    else if (consulta == 'estreno') orden='estreno';
    else if (consulta == 'plataforma') orden='plataforma';
    else if (consulta == 'precio') orden='precio';
    
    
    const jk = db.listadoJuegos(orden);
    jk.then((v) => {
        //console.log(v);
        res.json(v);
    }).catch(()=>{
        //Base de datos caida o mal direccionada
        res.send("Opps!!! parece ser que ha habido un problema interno, por favor espere mientras lo solucionamos")
    })
})

app.get('/busqueda', function(req, res) {

    if(req.query.titulo){
        const sh = db.detalleJuego(req.query.titulo);
        sh.then((v) => {
            res.json(v);
        }).catch(()=>{
            //Base de datos caida o mal direccionada
            res.send("Opps!!! parece ser que ha habido un problema interno, por favor espere mientras lo solucionamos")
        })
    } 

})

app.get('/buquedaempresa', function(req, res) {

    if(req.query.empresa){
        const sh = db.juegosEmpresa(req.query.empresa);
        sh.then((v) => {
            res.json(v);
        }).catch(()=>{
            //Base de datos caida o mal direccionada
            res.send("Opps!!! parece ser que ha habido un problema interno, por favor espere mientras lo solucionamos")
        })
    } else {
        res.send("Lo senstimos por favor regrese al inicio",404)
    }

})




app.post('/crearJuego', function(req, res) {

    //console.log(req.body)
    let insert = db.nuevoTitulo(req.body)
    insert.then(() => {
        res.set({
            'Content-Type': 'text/plain',
            'Content-Length': '123',
            'ETag': '12345'
          })
        res.status(200).send("Juego creado correctamente");
    }).catch(()=>{
        res.send("Ocurrio un error, es posible que el juego ya exista en la base de datos, revise e intente nuevamente")
    })
    
})

app.post('/compra', function(req, res) {

    //console.log(req.body)
    let verificar = db.detalleJuego(req.body.titulo)
    verificar.then((v) => {
        //res.send(v,200);
        let cantidad = req.body.cantidad
        if(v !== "lo sentimos su busqueda no es valida"){
            let buy = db.compra(v, cantidad);
        buy.then(()=>{
            console.log("Lo Logramos");
            let restante = parseInt(v[0].stock)-cantidad;
            console.log(restante)
            let update= db.ActualizarInventario(v[0].titulo, restante);
            update.then((j)=>{
                
            })

        }).catch(()=>{
            console.log('Tuvimos un error')
            
        })
        }
        


        res.send(`Compraste ${cantidad} copia del ${v[0].titulo}, felicitaciones, revisa tu correo para continuar`,200);
        
    }).catch(()=>{
        res.send("Lo sentimos, por favor regrese al inicio",404)
    })
    
})



server.listen(config.api.port, function () {
    console.log(`La aplicacion esta escuchando en '${config.host}:${config.api.port}`)
});
