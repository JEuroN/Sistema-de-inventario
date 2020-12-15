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
    crud.select(crud.selectA('product'))
    .then((results)=>{
        res.send({msg:results, status: 200});
    })
    .catch((err)=>{
        console.log(err);
        res.send({msg:err, status: 404})
    })
});

router.post('/crud', (req,res,next) =>{
    const {choice, data} = req.body;
    console.log(choice, data);
    switch(choice){
        case 0:
            //Eliminar
            crud.simple(crud.delete(data.id, 'product_id', 'product'))
            .then((r)=>{
                res.send({msg: 'Exito eliminando!', status: 200});
            })
            .catch((err)=>{
                res/send({msg: err, status: 400});
            })
            break;
        case 1:
            //Agregar
            crud.simple(crud.add_product(data.quant, data.name, data.prod, data.product_precio, data.prod, data.cod))
            .then((r)=>{
                res.send({msg: 'Exito eliminando!', status: 200});
            })
            .catch((err)=>{
                res.send({msg: err, status: 400});
            })
            break;
        case 3:
            //Actualizar
            crud.simple(crud.upd_product(data.id, data.name, data.quant, data.prod, data.product_precio, data.cod))
            .then((r)=>{
                res.send({msg: 'Exito actualizando!', status: 200});
            })
            .catch((err)=>{
                res.send({msg:err, status: 400});
            })
            break;
        case 4:
            //Buscar
            console.log(data);
            crud.select(crud.like_product_name(data))
            .then((nres)=>{
                if(nres.length > 0)
                    res.send({msg: nres, status: 200});
                else{
                    crud.select(crud.like_product_id(data))
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