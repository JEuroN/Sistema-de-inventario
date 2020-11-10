const express = require('express');
const cors = require('cors');
const login = require('./BLogin');
const personal = require('./BPersonal');
const inventario = require('./BInventario');
const proveedor = require('./BProveedor');

const serv = express();
serv.use(cors());
serv.use(express.json());
serv.use(express.urlencoded({extended: true}));
serv.use(express.static(__dirname + '/static'));

serv.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

serv.use('/', login);

serv.use('/personal/', personal);

serv.use('/inventario', inventario);

serv.use('/providers', proveedor);

serv.listen(3001, () => {
    console.log('Conectado exitosamente!');
})

