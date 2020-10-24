const express = require('express');



const serv = express();
serv.use(express.json());
serv.use(express.static(__dirname + '/static'))

serv.listen(5000, () => {
    console.log("Algo");
})