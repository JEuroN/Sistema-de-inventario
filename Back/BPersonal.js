const express = require('express');
const cors = require('cors');
const crud = require('./crud');

const serv = express();
serv.use(cors());
serv.use(express.json());
serv.use(express.urlencoded({extended: true}));
serv.use(express.static(__dirname + '/static'));

const router = express.Router();

router.get('/get', (req,res,next) => {
    crud.select('SELECT * FROM worker')
    .then((results)=>{
        res.send({msg:results, status: 200});
    })
    .catch((err)=>{
        console.log(err);
        res.send({msg:err, status: 404})
    })
});


module.exports = router;