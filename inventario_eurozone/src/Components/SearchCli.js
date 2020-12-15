import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'

const SearchClient = (props) => {

    const [name, setName] = useState('');

    const [client, setClient] = useState([
        {client_id: '', client_name: '', client_address: '', client_number: '', client_ced: ''}
    ]);

    const [data, setData] = useState('');

    const {setnClient, changeVis} = props;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios("http://localhost:3001/clients/crud", {
            method: 'POST',
            data: {data: name, choice: 4}, 
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

    const addClient = () => {
        setnClient(data);
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} />
                <input type="submit" placeholder="Buscar"/>
            </form>
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
                        {rows}
                    </tbody>
                </table>
                <button onClick={addClient}>Seleccionar</button>
                <button onClick={changeVis}>Volver</button>
            </div>
        </div>
     );
}
 
export default SearchClient;