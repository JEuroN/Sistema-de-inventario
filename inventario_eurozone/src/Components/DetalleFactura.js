import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'

const DetalleFactura = (props) => {

    const [fact, setFact] = useState([])

    const [prod, setProd] = useState([])

    const getFact = () => {
        console.log(props.selected)
        axios("http://localhost:3001/factura/getFact", {
            method: 'post',
            headers: {"Content-Type": "application/json"},
            data: {sale: props.selected}
        })
        .then((res)=>{
            console.log(res);
                setFact(res.data.info);
                setProd(res.data.products);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(getFact, [])

    const makeClient = () =>{
        if(fact[0] !== undefined){
        const {client_name, client_address, client_number, client_ced} = fact[0]
        return(
            <div>
                <label>Cliente</label>
                <p>{client_name}</p>
                <label>Direccion</label>
                <p>{client_address}</p>
                <label>Numero de cliente</label>
                <p>{client_number}</p>
                <label>Cedula de cliente</label>
                <p>{client_ced}</p>
            </div>
        )}
    }

    const makeInfo = () =>{
        if(fact[0] !== undefined){
            const {sale_number, sale_date, worker_name, worker_ced, sale_amount} = fact[0]
            return(
                <div>
                    <label>Empleado</label>
                    <p>{worker_name}</p>
                    <label>Fecha de venta</label>
                    <p>{sale_date.split('T')[0]}</p>
                    <label>Cedula de empleado</label>
                    <p>{worker_ced}</p>
                    <label>Numero de venta</label>
                    <p>{sale_number}</p>
                    <label>Monto total</label>
                    <p>{sale_amount}</p>
                </div>
            )}
    }

    const rows = prod.map((sale, index) => {
        const {product_name, product_id, product_precio, product_codigo} = sale;
        const {product_quantity} = fact[index]
        return(
            <tr key={product_id}>
                <td>{product_name}</td>
                <td>{product_codigo}</td>
                <td>{product_precio}</td>
                <td>{product_quantity}</td>
            </tr>
        )
    })

    const client = makeClient();

    const worker = makeInfo();

    return ( 
    <div>
        {client}
        {worker}
        <div>
            <h2>PRODUCTOS</h2>
            <table>
                <tbody>
                    <tr>
                    <th>NOMBRE</th>
                    <th>CODIGO</th>
                    <th>PRECIO</th>
                    <th>CANTIDAD</th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        </div>
        <button onClick={props.changeVis}>Volver</button>
    </div> 
    );
}
 
export default DetalleFactura;