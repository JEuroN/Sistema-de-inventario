const express = require('express');
const cors = require('cors');
const crud = require('./queries');

const serv = express();
serv.use(cors());
serv.use(express.json());
serv.use(express.urlencoded({extended: true}));

const router = express.Router();

router.post('/search', (req, res, next)=>{
    const {msj} = req.body;
    crud.select(crud.select_prod(msj))
    .then((r)=>{
        res.send({msg: r, status: 200});
    })
    .catch((e)=>{
        res.send({msg:e, status: 400});
    })
})

router.post('/get', (req,res,next)=>{
    crud.select(crud.selectA('sale'))
    .then((results)=>{
        res.send({msg:results, status: 200});
    })
    .catch((err)=>{
        console.log(err);
        res.send({msg:err, status: 404})
    })
})

router.post('/getCli', (req,res,next)=>{
    const {name} = req.body
    crud.select(crud.select_client(name))
    .then((r)=>{
        res.send({msg: r, status: 200})
    })
    .catch((e)=>{
        res.send({msg:e, status: 400})
    })
})

router.post('/bill', (req,res,next)=>{
    let currentDate = new Date();
    const {list, client, worker, id, monto} = req.body;
    let numFactura = Math.floor(Math.random() * (100000 - 1));
    for(let index = 0; index < list.length; index++) {
        let {name, precio, key, cod, cant, exis, prov} = list[index];
        crud.simple(crud.upd_product(key, name, exis-cant, prov, precio, cod))
        .then((r)=>{
            console.log('Actualizado')
        })
        .catch((err)=>{
            res.send({msg: err, status: 400});  
        })
    }
    crud.select(crud.add_sale(client.client_id, id, currentDate.toLocaleDateString(), numFactura, monto))
        .then((id)=>{
            let {sale_id} = id[0];
            console.log(sale_id);
            let done = 0;
            for (let index = 0; index < list.length; index++) {
                let {key, cant} = list[index];
                console.log(key, cant, sale_id);
                crud.simple(crud.product_sale(key, cant, sale_id, numFactura))
                .then((r)=>{
                    console.log('Insertado!');
                })
                .catch((err)=>{
                    res.send({msg: err, status:400})
                })
                done++;
            }
            if(done===list.length)
                res.send({msg: "Todo realizado!", status: 200})
        })
        .catch((err)=>{
            res.send({msg: err, status: 400});  
        })
})

module.exports = router;