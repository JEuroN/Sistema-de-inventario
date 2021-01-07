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
    crud.select(crud.selectA('provider'))
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
            crud.simple(crud.delete(data.id, 'provider_id', 'provider'))
            .then((r)=>{
                if(r===true)
                    res.send({msg: 'Exito actualizando!', status: 200});
                else
                    res.send({msg: false, status: 400});
            })
            .catch((err)=>{
                res.send({msg: err, status: 400});
            })
            break;
        case 1:
            //Agregar
            crud.select(crud.add_provider(data.name, data.prod, data.dir, data.num, data.ced))
            .then((r)=>{
                if(r[0]!==undefined){
                    crud.select(crud.add_product_return_id(0, data.prod, data.ced, 0, 'x'))
                    .then((re)=>{
                        crud.simple(crud.add_product_provide(r[0].provider_id, re[0].product_id))
                        .then((resp)=>{
                            res.send({msg: true, status:200})
                        }).catch((err)=>{
                            res.send({msg: false, status: 400});
                        })
                    }).catch((err)=>{
                        res.send
                    })
                }else{
                    res.send({msg:false, status: 400})
                }
            }).catch((err)=>{
                res.send({msg: false, status: 400})
            })
        case 3:
            //Actualizar
            crud.simple(crud.upd_provider(data.id, data.name, data.prod, data.dir,data.num, data.ced))
            .then((r)=>{
                if(r===true)
                    crud.simple(crud.upd_product_ced_prov(data.ced, data.lced))
                    .then((r)=>{
                        res.send({msg: 'Exito actualizando!', status: 200});
                    }).catch((err)=>{
                        res.send({msg: false, status: 400})
                    })
                else
                    res.send({msg: false, status: 400});
            })
            .catch((err)=>{
                res.send({msg:err, status: 400});
            })
            break;
            case 4:
                //Buscar
                crud.select(crud.like_provider_name(data))
                .then((nres)=>{
                    if(nres.length > 0)
                        res.send({msg: nres, status: 200});
                    else{
                        crud.select(crud.like_provider_id(data))
                        .then((idres)=>{
                            res.send({msg: idres, status: 200})
                        })
                        .catch((err)=>{
                            res.send({msg: false, status: 400})
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