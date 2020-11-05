const init = {};
const pgp = require('pg-promise')(init);
const config = {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'EuroZone',
    password: 'admin'
};

const db = pgp(config);

module.exports = {
    simple: async (query) =>{
        return await db.any(query)
   
        .then((f) =>{
                console.log(f);
                return true;
            }

        ).catch((err) => {
            console.log('Error en conex.js---'+err);
            return false
        })

    },
    select: async (query) => {
        return await db.any(query)
        .then((f)=>{
            console.log(f);
            if(f.length>0){
                return f;
            }else{
                return false;
            }
            
        })
        .catch((err)=>{
            console.log('Error en conex.js---'+err);
            return err;
        })
    }
}