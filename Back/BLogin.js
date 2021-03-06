const express = require('express');
const cors = require('cors');
const crud = require('./queries');

const serv = express();
serv.use(cors());
serv.use(express.json());
serv.use(express.urlencoded({extended: true}));
serv.use(express.static(__dirname + '/static'));

const router = express.Router();

router.post('/login', (req, res, next) => {
    let currentDate = new Date();
    const {name, pass} = req.body
    crud.select(crud.log_login(name, pass))
    .then((queryRes) => {
        if(queryRes!=false){
            crud.simple(crud.upDate(currentDate.toLocaleDateString(), name, pass))
            .then((updateRes) => {
                console.log("Updated!");
                if(queryRes[0].isadmin == true){
                    res.send({msg:0, status:200, name:queryRes[0].worker_name, id:queryRes[0].worker_id})
                }else
                    res.send({msg:1, status:200, name:queryRes[0].worker_name, id:queryRes[0].worker_id});
            })
            .catch((err) => {
                console.log(err);
                res.send({msg:"Error!", status:404});
            })
        }else
            res.send({msg:2,status:200})
    })
    .catch((err)=>{
        console.log(err);
        res.send({msg:"Error!", status:404});
    })
})

module.exports = router;

