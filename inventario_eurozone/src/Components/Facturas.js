import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import DetalleFactura from './DetalleFactura'

const Facturas = () => {

    const [sale, setSale] = useState([]);

    const [data, setData] = useState('');

    const [filter, setFilter] = useState([]);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getSales();
    },[]);

    const getSales = () => {
        axios("http://localhost:3001/factura/get", {
            method: 'get',
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            if(res.data.msg.length > 0)
                setSale(res.data.msg);
            else
                setSale([
                    {sale_id: 'x', worker_id: 'No se encuentran', sale_date: 'datos'}
                ])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const select = (id) =>{
        console.log(id);
        let filter = sale.filter(sales =>{
            return sales.sale_id === id
        })
        setData(filter[0]);
    }

    const rows = sale.map((sale, index) => {
        const {sale_id, sale_date, sale_amount, sale_number} = sale;
        return(
            <tr key={sale_id} onClick={(e)=>{select(sale_id)}}>
                <td>{sale_number}</td>
                <td>{sale_date.split('T')[0]}</td>
                <td>{sale_amount}</td>
            </tr>
        )
    })

    const search =sale.map((sale, index) => {
        const {sale_id, sale_date, sale_amount, sale_number} = sale;
        if(sale_number.toString().includes(filter) === true){
            return(
                <tr key={sale_id} onClick={(e)=>{select(sale_id)}}>
                    <td>{sale_number}</td>
                    <td>{sale_date.split('T')[0]}</td>
                    <td>{sale_amount}</td>
                </tr>
            )
        }else
            return null;
    })

    const changeVis = () =>{
        if(data)
            setVisible(!visible)
    }

    return ( 
    <div>
        <div>
            <h2>FACTURAS</h2>
            <table>
                <tbody>
                    <tr>
                    <th>NUMERO</th>
                    <th>FECHA</th>
                    <th>MONTO</th>
                    </tr>
                    {filter.length < 1 ? (rows) : (search)}
                </tbody>
            </table>
        </div>
        <div>
            <input onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}} />
            <button onClick={changeVis}>Seleccionar</button>
        </div>
            {visible ? (<DetalleFactura changeVis={()=>{setVisible(!visible)}} selected={data}/>) : null}
    </div> 
    );
}
 
export default Facturas;