import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import { AuthContext } from '../Context/authContext'
import DetalleFactura from './DetalleFactura'
import {useHistory} from 'react-router-dom'

const Facturas = () => {

    const [sale, setSale] = useState([]);

    const [data, setData] = useState('');

    const [filter, setFilter] = useState([]);

    const [visible, setVisible] = useState(false);

    const {isAuth} = useContext(AuthContext);

    const history = useHistory();

    const check = () =>{
        if(!isAuth)
            history.push('/')
    }

    useEffect(check, [isAuth]);

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
            <tr key={sale_id} onClick={(e)=>{select(sale_id)}} className={sale_id === data.sale_id ? 'light-blue lighten-2' : null}>
                <td>{sale_number}</td>
                <td>{sale_date.split('T')[0]}</td>
                <td>{sale_amount}</td>
            </tr>
        )
    })

    const search = sale.map((sale, index) => {
        const {sale_id, sale_date, sale_amount, sale_number} = sale;
        if(sale_number.toString().includes(filter) === true){
            return(
                <tr key={sale_id} onClick={(e)=>{select(sale_id)}} className={sale_id === data.sale_id ? 'light-blue lighten-2' : null}>
                    <td>{sale_number}</td>
                    <td>{sale_date.split('T')[0]}</td>
                    <td>{sale_amount} BsS</td>
                </tr>
            )
        }else
            return null;
    })

    const changeVis = () =>{
        console.log(data);
        if(data)
            setVisible(!visible)
    }

    return ( 
    <div>
        <div className='container'>
            <h2 className='center '>FACTURAS</h2>
            <table className='striped centered responsive-table'>
                <thead>
                    <tr>
                    <th>NUMERO</th>
                    <th>FECHA</th>
                    <th>MONTO</th>
                    </tr>
                </thead>
                <tbody>
                    {filter.length < 1 ? (rows) : (search)}
                </tbody>
            </table>
        </div>
        <div className='row section cols12'>
            {visible ? (<DetalleFactura changeVis={()=>{setVisible(!visible)}} selected={data}/>) : (
        <div className='row container center-align'>
            <div className='section input-field'>    
                <i className="material-icons col s1 push-s3 prefix">search</i>
                <input className='col s4 push-s3 black-text validate' placeholder='Busqueda' id='search' onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}} />
            </div>
            <div className='center row col s12'>
                <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={changeVis}>Seleccionar</button>
            </div>
        </div>  
       )}
       </div>
    </div> 
    );
}
 
export default Facturas;