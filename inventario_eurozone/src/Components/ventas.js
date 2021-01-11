import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import Monto from './Monto'
import VentasInf from './VentasInf'
import SearchProd from './SearchProd'
import { AuthContext } from '../Context/authContext'
import './../Assets/App.css'
import { useHistory } from 'react-router-dom'

const Ventas = () => {

    const {isAuth, isId} = useContext(AuthContext)

    const [list, setList] = useState([]);

    const [submit, setSubmit] = useState('');

    const [montoT, setMontoT] = useState(0);

    const [visible, setVisible] = useState(false);

    const [clientData, setData] = useState({client_name: 'Introduzca la cedula'});

    const [off, setOff] = useState(true);

    const [item, setItem] = useState([])

    const [flash, setFlash] = useState('');

    const history = useHistory();

    const check = () =>{
        if(!isAuth)
            history.push('/')
    }


    useEffect(check, [isAuth])

    const makeList = list.map(product => {
         const {key, name, precio, cod, cant, quant} = product;
         return(
            <tr key={key} onClick={(e)=>{select(key)}} className={key === item.key ? 'light-blue lighten-2' : null}>
                <td>{cod}</td>
                <td>{name}</td>
                <td className={key === flash ? 'red' : null}>{cant}</td>
                <td>{precio}</td>
                <td>{quant}</td>
            </tr>
     )
    })

    const makeFlash = (id) => {
        setFlash(id)
        setTimeout(function(){
            setFlash('');
       },200);
    }

    const select = (id) =>{
        console.log(id);
        let filter = list.filter(product =>{
            return product.key === id
        })
        setItem(filter[0]);
    }  

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
                    setList([{name: product_name, precio: product_precio, key: product_id, cod: product_codigo, cant: 1, exis: product_quant, prov: product_prov, quant: product_quant}])
                else
                    setList([...list, {name: product_name, precio: product_precio, key: product_id, cod: product_codigo, cant: 1, exis: product_quant, prov: product_prov, quant: product_quant}])
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

     const deleteList = (key, e) => {
        e.preventDefault();
        let filter = list.filter(product => {
            if(product.key !== key)
                return product
            else{
                if(product.cant > 1){
                    product.cant --;
                    makeFlash(product.key);
                    return product;
                }
            }
        })
        setList(filter);
     }

     const changeVisible = () =>{
         setVisible(!visible);
         setOff(!off);
     }

    return(
        <div className='row'>
            <div className='row col s6' style={{display: 'flex'}}>
                <div className='row col s12 center-align' style={{position: 'relative', marginLeft: '45px'}}>
                    <div>
                        <h3 className='center row'>PRODUCTOS</h3>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <div className='col s12'>
                                <i className="material-icons col s1 push-s2 prefix">search</i>
                                <input className='col s6 push-s2 black-text validate' value={submit} onChange={(e)=>{setSubmit(e.target.value)}} />
                            </div>
                            {off ? (<div centerName='center'>
                                <button className='center waves-effect waves-light btn center' type='submit'>Agregar</button>
                                <button className='center waves-effect waves-light btn center' onClick={changeVisible}>Buscar</button>
                                <button className='center waves-effect waves-light btn center' onClick={(e)=>{deleteList(item.key, e)}}>Eliminar</button>
                            </div>) : null}
                        </form>
                    </div>
                        {visible ? (<SearchProd list={list} setList={setList} changeVis={changeVisible}/>) : (null)}
                </div>
            <div className='row col s6' style={{position: 'fixed', marginTop: '200px', marginLeft: '30px'}}>     
                <div className='col s12 container'>
                    <table className='centered'>
                        <thead className='thead-s'>
                            <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>CANT.</th>
                            <th>PRECIO</th>
                            <th>EXISTENCIA</th>
                            </tr>
                        </thead>
                        <tbody  className='tbody-s'>
                            {makeList}
                        </tbody>
                    </table>   
                </div>
            </div>
            </div>
            <div style={{marginLeft: '190px'}}>
                <div className='container center col s5 push-s1' style={{background: '#e0f2f1'}}>
                        <VentasInf clientData={clientData} setOff={setOff} off={off} setData={setData} />
                </div>
                <div className='col s5 pull-s1 container section center-align right' style={{position: 'relative', marginTop: '60px', background: '#b2dfdb'}}>
                    <Monto prop={list} montoT={montoT} />
                    {off ? (<button onClick={handlePago} className='center waves-effect waves-light btn center'>Procesar Pago</button>) : null}
                </div>
            </div>
        </div>
    )
}

export default Ventas;