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
                if(r===true)
                    res.send({msg: 'Exito actualizando!', status: 200});
                else
                    res.send({msg: false, status: 400});
            })
            .catch((err)=>{
                res/send({msg: err, status: 400});
            })
            break;
        case 1:
            //Agregar
            crud.select(crud.select_provider(data.prod))
            .then((r)=>{
                if(r[0]!==undefined){
                    let {provider_id} = r[0];
                    crud.select(crud.add_product_return_id(data.quant, data.name, data.prod, data.product_precio, data.cod))
                    .then((id)=>{
                        if(id[0] !== false){
                            let {product_id} = id[0]
                            crud.simple(crud.add_product_provide(provider_id, product_id))
                            .then((re)=>{
                                res.send({msg: 'Exito eliminando!', status: 200});
                            }).catch((err)=>{
                                res.send({msg: false, status: 400})
                            })
                        }else{
                            res.send({msg: false, status: 400})
                        }
                    })
                    .catch((err)=>{
                        res.send({msg: false, status: 400});
                    })
                    
                }else{
                    console.log()
                    crud.select(crud.add_provider('Desconocido', data.name, "Desconocido", 0, data.prod))
                    .then((r)=>{
                        if(r[0] !== undefined){
                            console.log('hace esto')
                            let {provider_id} = r[0];
                            crud.select(crud.add_product_return_id(data.quant, data.name, data.prod, data.product_precio, data.cod))
                            .then((id)=>{
                                if(id[0] !== false){
                                let {product_id} = id[0]
                                    crud.simple(crud.add_product_provide(provider_id, product_id))
                                .then((re)=>{
                                    res.send({msg: 'Exito eliminando!', status: 200});
                                }).catch((err)=>{
                                    res.send({msg: false, status: 400})
                                })
                            }else{
                                res.send({msg: false, status: 400})
                            }
                            })
                            .catch((err)=>{
                                crud.simple(crud.delete(provider_id, "provider_id", 'provider'))
                                .then((f)=>{
                                    res.send({msg: false, status: 400});
                                }).catch((r)=>{
                                    res.send({msg: false, status: 400})
                                })
                            })

                        }else{
                            res.send({msg: false, status: 400})
                        }
                    }).catch((err)=>{
                        res.send({msg: false, status: 400})
                    })
                }
            }).catch((err)=>{
                res.send({msg: false, status: 400})
            })
            break;
        case 3:
            //Actualizar
            crud.simple(crud.upd_product(data.id, data.name, data.quant, data.prod, data.product_precio, data.cod))
            .then((r)=>{
                if(r===true)
                    res.send({msg: 'Exito actualizando!', status: 200});
                else
                    res.send({msg: false, status: 400});
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