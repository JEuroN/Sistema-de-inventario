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

module.exports = router;