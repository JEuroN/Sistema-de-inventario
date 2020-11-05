const express = require('express');
const cors = require('cors');
const crud = require('./crud');

const serv = express();
serv.use(cors());
serv.use(express.json());
serv.use(express.urlencoded({extended: true}));
serv.use(express.static(__dirname + '/static'));

const router = express.Router();

router.post('/login', (req, res, next) => {
    let currentDate = new Date();
    let string = `SELECT * FROM WORKER WHERE worker_name='${req.body.name}' AND worker_password='${req.body.pass}';`;
    crud.select(string)
    .then((queryRes) => {
        if(queryRes!=false){
            crud.simple(`UPDATE worker SET worker_login='${currentDate.toLocaleDateString()}' WHERE worker_name='${req.body.name}' AND worker_password='${req.body.pass}';`)
            .then((updateRes) => {
                console.log("Updated!");
                if(queryRes[0].ismanager == true){
                    res.send({msg:0, status:200, name:queryRes[0].worker_name})
                }else
                    res.send({msg:1, status:200, name:queryRes[0].worker_name});
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

