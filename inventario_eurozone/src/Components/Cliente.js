import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import ModelCli from './ModelCli'

const Cliente = () => {

    const {isAdmin} = useContext(AuthContext);

    const [visible, setVisible] = useState(false);

    const [client, setClient] = useState([
        {client_id: 'x', client_name: 'Buscando productos', client_address: 'espere', client_number: '', client_ced: ''}
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
            <tr key={client_id} onClick={(e)=>{select(client_id)}}>
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
                <tr key={client_id} onClick={(e)=>{select(client_id)}}>
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
            <div>
                <h2>CLIENTES</h2>
                <table>
                    <tbody>
                        <tr>
                        <th>NOMBRE</th>
                        <th>DIRECCION</th>
                        <th>NUMERO</th>
                        <th>CEDULA</th>
                        </tr>
                        {filter.length < 1 ? (rows) : (search)}
                    </tbody>
                </table>
            </div>
            <div>
                <input onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}} />
                {isAdmin ? (
                    <div>
                        <button onClick={()=>{changeVis(1)}}>Agregar</button>
                        <button onClick={()=>{changeVis(3)}}>Modificar</button>
                        <button onClick={()=>{changeVis(0)}}>Eliminar</button>
                        <button>Volver</button>
                    </div>
                    ) : (
                        <button>Volver</button>               
                    )}
            </div>
            {visible ? (<ModelCli changeVis={()=>{changeVis(2)}} selected={data} choice={choice} act={getClients}/>) : null}
        </div>
     );
}
 
export default Cliente;