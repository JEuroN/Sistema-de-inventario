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
    selectProdId: (id) => {
        return `SELECT * FROM product WHERE product_id=${id}`
    },
    upDate: (date, name, pass) => {
        return `UPDATE worker SET worker_login='${date}' WHERE worker_name='${name}' AND worker_password='${pass}'`
    },
    selectA: (table) => {
        return `SELECT * from ${table}`
    },
    add_product_return_id: (quant, name, prod, precio, codigo) =>{
        return `INSERT INTO product(product_quant, product_name, product_prov, product_precio, product_codigo) VALUES (${quant}, '${name}', '${prod}', ${precio}, '${codigo}') returning product_id`
    },
    upd_product: (id, name, quant, prod, precio, codigo) => {
        return `UPDATE product SET product_name='${name}', product_quant='${quant}', product_prov=${prod}, product_precio='${precio}', product_codigo='${codigo}' WHERE product_id=${id}`
    },
    upd_product_ced_prov: (ced, lced) => {
        return  `UPDATE product SET product_prov=${ced} WHERE product_prov=${lced}`
    },
    add_provider: (name, prod, dir, num, ced) => {
        return `INSERT INTO provider(provider_name, provider_prod, provider_dir, provider_num, provider_ced) VALUES ('${name}', '${prod}', '${dir}', '${num}', ${ced}) returning provider_id`
    },
    select_provider: (id) =>{
        return `SELECT * FROM provider WHERE provider_name='${id}' OR provider_ced=${id} OR provider_id=${id}`
    },
    upd_provider: (id, name, prod, dir, num, ced) => {
        return `UPDATE provider SET provider_name='${name}', provider_prod='${prod}', provider_dir='${dir}', provider_num='${num}', provider_ced=${ced} WHERE provider_id=${id}` 
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
    },
    like_product_name: (name) => {
        return `SELECT * FROM product WHERE product_name ILIKE '%${name}%';`
    },
    like_product_id: (id) => {
        return `SELECT * FROM product WHERE CAST(product_codigo AS TEXT) LIKE '%${id}}%;'`
    },
    like_client_name: (name) =>{
        return `SELECT * FROM cliente WHERE client_name ILIKE '%${name}%';`
    },
    like_client_id: (id) =>{
        return `SELECT * FROM cliente WHERE CAST(client_ced AS TEXT) ILIKE '%${id}%';`
    },
    like_provider_id: (id) =>{
        return `SELECT * FROM provider WHERE CAST(provider_ced AS TEXT) ILIKE '%${id}%';`
    },
    like_provider_name: (name) =>{
        return `SELECT * FROM provider WHERE provider_name ILIKE '%${name}%';`
    },
    add_sale: (client_id, work_id, date, sale_number, montot) =>{
        return `INSERT INTO sale(client_id, worker_id, sale_date, sale_number, sale_amount) VALUES('${client_id}', '${work_id}','${date}','${sale_number}','${montot}') RETURNING sale_id`
    },
    product_sale: (prod_id, prod_cuant, sale_id, sale_number) =>{
        return `INSERT INTO product_sale(product_id, product_quantity, sale_id, sale_number) VALUES('${prod_id}', '${prod_cuant}', '${sale_id}', '${sale_number}')`
    },
    get_detalle: (number, clientid, workid) =>{
        return `SELECT * FROM product_sale JOIN sale ON product_sale.sale_number = ${number} JOIN cliente ON cliente.client_id = ${clientid} JOIN worker ON worker.worker_id = ${workid}`
    },
    add_product_provide: (id_prov, id_prod) =>{
        return `INSERT INTO product_provider(provider_id, product_id) VALUES (${id_prov}, ${id_prod})`
    }
    
}