import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import ModelCli from './ModelCli'
import './../Assets/App.css'
import {useHistory} from 'react-router-dom'


const Cliente = () => {

    const [visible, setVisible] = useState(false);

    const [client, setClient] = useState([
        {client_id: 'x', client_name: 'Buscando productos', client_address: 'espere', client_number: '', client_ced: ''}
    ]);

    const [data, setData] = useState('');

    const [filter, setFilter] = useState('');

    const [choice, setChoice] = useState('');

    const {isAuth} = useContext(AuthContext);

    const history = useHistory();

    const check = () =>{
        if(!isAuth)
            history.push('/')
    }


    useEffect(check, [isAuth])

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
        getClients();
    },[]);

    const getClients = () => {
        axios("http://localhost:3001/clients/get", {
            method: 'get',
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            if(res.data.msg.length > 0)
                setClient(res.data.msg);
            else
                setClient([
                    {client_id: 'x', client_name: 'No se encuentran', client_address: 'datos'}
                ])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const select = (id) =>{
        console.log(id);
        let filter = client.filter(client =>{
            return client.client_id === id
        })
        setData(filter[0]);
    }    
    

    const rows = client.map((client, index) => {
        const {client_id, client_name, client_address, client_number, client_ced} = client;
        return(
            <tr key={client_id} onClick={(e)=>{select(client_id)}} className={client_id === data.client_id ? 'light-blue lighten-2' : null}>
                <td>{client_name}</td>
                <td>{client_address}</td>
                <td>{client_number}</td>
                <td>{client_ced}</td>
            </tr>
        )
    })



    const search = client.map((client, index) => {
        const {client_id, client_name, client_address, client_number, client_ced} = client;
        if(client_name.toLowerCase().includes(filter.toLowerCase()) === true){
            return(
                <tr key={client_id} onClick={(e)=>{select(client_id)}} className={client_id === data.client_id ? 'light-blue lighten-2' : null}>
                    <td>{client_name}</td>
                    <td>{client_address}</td>
                    <td>{client_number}</td>
                    <td>{client_ced}</td>
                </tr>
            )
        }else
            return null;
    })


    return ( 
        <div>
            <div className='container'>
                <h2 className='center '>CLIENTES</h2>
                <table className='striped centered responsive-table'>
                    <thead>
                        <tr>
                        <th>NOMBRE</th>
                        <th>DIRECCION</th>
                        <th>NUMERO</th>
                        <th>CEDULA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.length < 1 ? (rows) : (search)}
                    </tbody>
                </table>
            </div>
            {visible ? (<ModelCli changeVis={()=>{changeVis(2)}} selected={data} choice={choice} act={getClients}/>) : (
                <div className='row container center-align'>
                    <div className='section input-field'>
                        <i className="material-icons col s1 push-s3 prefix">search</i>
                        <input className='col s4 push-s3 black-text validate' placeholder='Busqueda' onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}}  id="search"/>
                    </div>
                    <div className='center row col s12'>
                        <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(1)}}>Agregar</button>
                        <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(3)}}>Modificar</button>
                        <button className='center waves-effect waves-light btn center' onClick={()=>{changeVis(0)}}>Eliminar</button>
                    </div>
                </div>
                )}
        </div>
     );
}
 
export default Cliente;