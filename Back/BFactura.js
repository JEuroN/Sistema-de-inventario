const express = require('express');
const cors = require('cors');
const crud = require('./queries');

const serv = express();
serv.use(cors());
serv.use(express.json());
serv.use(express.urlencoded({extended: true}));
serv.use(express.static(__dirname + '/static'));

const router = express.Router();

router.get('/get', (req,res,next)=>{
    crud.select(crud.selectA('sale'))
    .then((results)=>{
        res.send({msg:results, status: 200});
    })
    .catch((err)=>{
        console.log(err);
        res.send({msg:err, status: 404})
    })
})

router.post('/getFact', (req, res, next) =>{
    let productArr = [];
    let {sale_number, client_id, worker_id} = req.body.sale
    crud.select(crud.get_detalle(sale_number, client_id, worker_id))
    .then((dbres)=>{
            for(let index = 0; index < dbres.length; index++) {
            crud.select(crud.selectProdId(dbres[index].product_id))
            .then((r)=>{
                productArr = [...productArr, ...r]
                if(index==dbres.length-1)
                    res.send({products: productArr, info: dbres});
            })
            .catch((err)=>{
                console.log(err);
            }) 
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})


module.exports = router;