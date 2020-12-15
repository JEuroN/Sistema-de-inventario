import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import Monto from './Monto'
import VentasInf from './VentasInf'
import SearchProd from './SearchProd'
import { AuthContext } from '../Context/authContext'

const Ventas = () => {

    const [list, setList] = useState([]);

    const [submit, setSubmit] = useState('');

    const [montoT, setMontoT] = useState(0);

    const [visible, setVisible] = useState(false);

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
            let {product_name, product_precio, product_id, product_codigo} = res.data.msg[0];
            const exist = list.findIndex(item => item.name === product_name);
            console.log(exist);
            if(exist === -1){
                setList([...list, {name: product_name, precio: product_precio, key: product_id, cod: product_codigo, cant: 1}])
            }
            else{
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
                <VentasInf />
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
        </div>
    )
}

export default Ventas;