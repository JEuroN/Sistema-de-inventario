const express = require('express');
const cors = require('cors');
const crud = require('./queries');

const serv = express();
serv.use(cors());
serv.use(express.json());
serv.use(express.urlencoded({extended: true}));
serv.use(express.static(__dirname + '/static'));

const router = express.Router();

router.get('/get', (req,res,next) => {
    crud.select(crud.selectA('cliente'))
    .then((r) => {
        console.log(r);
        res.send({msg: r, status: 200});
    })
    .catch((e)=>{
        res.send({msg: e, status: 400});
    })
})

router.post('/crud', (req,res,next) =>{
    const {choice, data} = req.body;
    console.log(choice, data);
    switch(choice){
        case 0:
            //Eliminar
            crud.simple(crud.delete(data.id, 'client_id', 'cliente'))
            .then((r)=>{
                res.send({msg: 'Exito eliminando!', status: 200});
            })
            .catch((err)=>{
                res.send({msg: err, status: 400});
            })
            break;
        case 1:
            //Agregar
            crud.simple(crud.add_client(data.name, data.numero, data.adrs, data.ced))
            .then((r)=>{
                res.send({msg: 'Exito eliminando!', status: 200});
            })
            .catch((err)=>{
                res.send({msg: err, status: 400});
            })
            break;
        case 3:
            //Actualizar
            crud.simple(crud.upd_client(data.id, data.name, data.numero, data.adrs, data.ced))
            .then((r)=>{
                res.send({msg: 'Exito actualizando!', status: 200});
            })
            .catch((err)=>{
                res.send({msg:err, status: 400});
            })
            break;
        case 4:
            //Buscar
            console.log(data, 'hola');
            crud.select(crud.like_client_name(data))
            .then((nres)=>{
                if(nres.length > 0)
                    res.send({msg: nres, status: 200});
                else{
                    crud.select(crud.like_client_id(data))
                    .then((idres)=>{
                        res.send({msg: idres, status: 200})
                    })
                    .catch((err)=>{
                        res.send({msg: err, status: 400})
                    })
                }
            })
            .catch((err)=>{
                res.send({msg: err, status: 400});
            })
            break;
        default:
            //Error
            break;
    }
})


module.exports = router;