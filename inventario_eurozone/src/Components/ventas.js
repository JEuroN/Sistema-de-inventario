import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import Monto from './Monto'
import VentasInf from './VentasInf'
import SearchProd from './SearchProd'
import { AuthContext } from '../Context/authContext'

const Ventas = () => {

    const {isAuth, isId} = useContext(AuthContext)

    const [list, setList] = useState([]);

    const [submit, setSubmit] = useState('');

    const [montoT, setMontoT] = useState(0);

    const [visible, setVisible] = useState(false);

    const [clientData, setData] = useState({client_name: 'Introduzca la cedula'});

    const makeList = list.map(product => {
         const {key, name, precio, cod, cant} = product;
         return(
            <tr key={key}>
                <td>{cod}</td>
                <td>{name}</td>
                <td>{cant}</td>
                <td>{precio}</td>
                <td><button onClick={()=>(deleteList(key))}>X</button></td>
            </tr>
     )
    })

    useEffect(() => {
        let element = 0;
        for (let index = 0; index < list.length; index++) {
            element += list[index].precio * list[index].cant;  
        }
        setMontoT(element);
    }, [list])

     const handleSubmit = (e) => {
         e.preventDefault();
         axios("http://localhost:3001/sales/search", {
             method: 'POST',
             data: {msj: submit}, 
             headers: {"Content-Type": "application/json"}
         })
         .then((res)=>{
            console.log(res);
            let {product_name, product_precio, product_id, product_codigo, product_quant, product_prov} = res.data.msg[0];
            const exist = list.findIndex(item => item.name === product_name);
            if(exist === -1 ){
                if(list[0] === undefined || list[0].key === -1 )
                    setList([{name: product_name, precio: product_precio, key: product_id, cod: product_codigo, cant: 1, exis: product_quant, prov: product_prov}])
                else
                    setList([...list, {name: product_name, precio: product_precio, key: product_id, cod: product_codigo, cant: 1, exis: product_quant, prov: product_prov}])
            }else{
                let newArray = [...list];
                let Arr = {...newArray[exist]};
                Arr.cant += 1;
                newArray[exist] = Arr;
                setList(newArray);
            }
         })
         .catch((err)=>{
             console.log(err);
         })
     }

     const handlePago = () => {
         if(list.length === 0 || list[0].key === -1){
             setList([{name: "Por favor, inserte un producto", precio: 0, cant: 0, key:-1}]);
         }else if(clientData.client_id == null){
             setData({name: "Por favor, ingrese un cliente"});
         }else{
            axios("http://localhost:3001/sales/bill", {
            method: 'POST',
            data: {list: list, client: clientData, id: isId, worker: isAuth, monto: montoT}, 
            headers: {"Content-Type": "application/json"}
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            }) 
         }
     
     }

     const deleteList = (key) => {
        console.log(key);
        let filter = list.filter(product => {
            console.log(product);
            return product.key !== key
        })
        setList(filter);
     }

    return(
        <div>
            <div>
                <Monto prop={list} montoT={montoT} />
                <VentasInf clientData={clientData} setData={setData} />
                <h2>PRODUCTOS</h2>
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <input value={submit} onChange={(e)=>{setSubmit(e.target.value)}} />
                    <input type='submit' value='Agregar'/>
                </form>
                <button onClick={()=>{setVisible(!visible)}}>Buscar</button>
                {visible ? (<SearchProd list={list} setList={setList} changeVis={()=>{setVisible(!visible)}}/>) : (null)}
                <table>
                    <tbody>
                        <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>CANT.</th>
                        <th>PRECIO</th>
                        </tr>
                        {makeList}
                    </tbody>
                </table>   
            </div>     
            <button onClick={handlePago}>Procesar Pago</button>
        </div>
    )
}

export default Ventas;