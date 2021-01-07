import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import PopInv from './modelInv'
import './../Assets/App.css'

const Inventario = () => {

    const {isAdmin} = useContext(AuthContext);

    const [visible, setVisible] = useState(false);

    const [product, setProduct] = useState([
        {product_id: 'x', product_precio: 'Buscando productos', product_quant: 'espere', product_name: 'x', product_prov: 'x', product_codigo: ''}
    ]);

    const [data, setData] = useState('');

    const [filter, setFilter] = useState('');

    const [choice, setChoice] = useState('');

    const changeVis = (add) => {
        if(data.length !== 0 || add === 1 || add === 2){
            console.log(add);
            switch(add){
                case 0:
                    //Eliminar
                    setVisible(!visible);
                    setChoice(0);
                    break;
                case 1:
                    //Crear
                    setData('');
                    setVisible(!visible);
                    setChoice(1)
                    break;
                case 2: 
                    //Volver a elegir
                    setVisible(!visible);
                    setData('');
                    break;
                case 3:
                    //Actualizar
                    setVisible(!visible);
                    setChoice(3);
                    break;
                default:
                    //Negado
                    break;
            }
        }
    }

    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = () => {
        axios("http://localhost:3001/inventario/get", {
            method: 'get',
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            if(res.data.msg.length > 0)
                setProduct(res.data.msg);
            else
                setProduct([
                    {product_id: 'x', product_name: 'No se encuentran', product_quant: 'datos'}
                ])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const select = (id) =>{
        console.log(id);
        let filter = product.filter(product =>{
            return product.product_id === id
        })
        setData(filter[0]);
    }

    const rows = product.map((product, index) => {
        const {product_id, product_name, product_quant, product_precio, product_prov, product_codigo} = product;
        return(
            <tr key={product_id} onClick={(e)=>{select(product_id)}} className={product_id === data.product_id ? 'light-blue lighten-2' : null}>
                <td>{product_name}</td>
                <td>{product_quant}</td>
                <td>{product_precio}</td>
                <td>{product_prov}</td>
                <td>{product_codigo}</td>
            </tr>
        )
    })

    const search = product.map((product, index) => {
        const {product_id, product_name, product_quant, product_precio, product_prov, product_cod} = product;
        if(product_name.toLowerCase().includes(filter.toLowerCase()) === true){
            return(
                <tr key={product_id} onClick={(e)=>{select(product_id)}} className={product_id === data.product_id ? 'light-blue lighten-2' : null}>
                    <td>{product_name}</td>
                    <td>{product_quant}</td>
                    <td>{product_precio}</td>
                    <td>{product_prov}</td>
                    <td>{product_cod}</td>
                </tr>
            )
        }else
            return null;
    })

    return ( 
        <div>
            <div className='container'>
                <h2 className='center '>INVENTARIO</h2>
                <table className='striped centered'>
                    <thead>    
                        <tr>
                        <th>NOMBRE</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>PROVEEDOR</th>
                        <th>CODIGO</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        {filter.length < 1 ? (rows) : (search)}
                    </tbody>
                </table>
            </div>
            {visible ? (<PopInv changeVis={()=>{changeVis(2)}} selected={data} choice={choice} act={getProducts}/>) : (
                <div className='row container center-align'>
                <div className='section input-field'>
                    <i className="material-icons col s1 push-s3 prefix">search</i>
                    <input className='col s4 push-s3 black-text validate' placeholder='Busqueda' id='search' onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}} />
                </div>
                <div className='center row col s12'>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(1)}}>Agregar</button>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }}  onClick={()=>{changeVis(3)}}>Modificar</button>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }}  onClick={()=>{changeVis(0)}}>Eliminar</button>
                </div>
                </div>
                )}
        </div>
     );
}
 
export default Inventario;