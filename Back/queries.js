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
    },
    upd_worker: (name, date, num, ced, puesto, id) => {
        return `UPDATE worker SET worker_name='${name}', worker_login='${date}', worker_num='${num}', worker_ced='${ced}', worker_assing='${puesto}' WHERE worker_id=${id}`
    },
    add_worker: (name, ced, date, numero, puesto) => {
        console.log(name, ced, date, numero, puesto);
        return `INSERT INTO worker(worker_name, worker_password, worker_login, worker_num, worker_ced, IsAdmin, worker_assing) VALUES ('${name}', '${ced}', '${date}', ${numero}, ${ced}, false, '${puesto}')`
    },
    delete: (id, column, table) => {
        return `DELETE FROM ${table} WHERE ${column}=${id}`
    },
    log_login: (name, pass) => {
        return `SELECT * FROM WORKER WHERE worker_name='${name}' AND worker_password='${pass}';`
    },
    upDate: (date, name, pass) => {
        return `UPDATE worker SET worker_login='${date}' WHERE worker_name='${name}' AND worker_password='${pass}'`
    },
    selectA: (table) => {
        return `SELECT * from ${table}`
    },
    add_product: (quant, name, prod, precio, codigo) => {
        return `INSERT INTO product(product_quant, product_name, product_prov, product_precio, product_codigo) VALUES (${quant}, '${name}', '${prod}', ${precio}, ${codigo})`
    },
    upd_product: (id, name, quant, prod, precio, codigo) => {
        return `UPDATE product SET product_name='${name}', product_quant='${quant}', product_prov='${prod}', product_precio='${precio}', product_codigo='${codigo}' WHERE product_id=${id}`
    },
    add_provider: (name, prod, dir, num) => {
        return `INSERT INTO provider(provider_name, provider_prod, provider_dir, provider_num) VALUES ('${name}', '${prod}', '${dir}', '${num}')`
    },
    upd_provider: (id, name, prod, dir, num) => {
        return `UPDATE provider SET provider_name='${name}', provider_prod='${prod}', provider_dir='${dir}', provider_num='${num}' WHERE provider_id=${id}`
    },
    select_prod: (data) => {
        return `SELECT * FROM product WHERE product_name='${data}' OR product_codigo='${data}'`
    },
    add_client: (name, num, adrs, ced) => {
        return `INSERT INTO cliente(client_name, client_address, client_number, client_ced) VALUES ('${name}','${adrs}','${num}','${ced}')`
    },
    upd_client: (id, name, num, adrs, ced) => {
        return `UPDATE cliente SET client_name='${name}', client_address='${adrs}', client_number='${num}', client_ced='${ced}' WHERE client_id=${id}`
    },
    select_client: (name) => {
        return `SELECT * FROM cliente WHERE client_name='${name}' OR client_ced='${name}'`
    }

}