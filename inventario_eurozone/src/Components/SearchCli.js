import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import ModelCli from './ModelCli'
import Modal from 'react-modal'

const SearchClient = (props) => {

    const [name, setName] = useState('');

    const [client, setClient] = useState([
        {client_id: '', client_name: '', client_address: '', client_number: '', client_ced: ''}
    ]);

    const [data, setData] = useState('');

    const [modalVis, setModalVis] = useState(false);

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
            <tr key={client_id} onClick={(e)=>{select(client_id)}} className={client_id === data.client_id ? 'light-blue lighten-2' : null}>
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

    const addClient = (e) => {
        setnClient(data);
        changeVis(e);
    }

    return ( 
        <div className='container'>
            <Modal isOpen={true} ariaHideApp={false}>
            <div className='center'>
            <h2 className='center'>CLIENTES</h2>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <input className='col s4 push-s4 black-text validate' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    <input className='col s1 push-s4 center waves-effect waves-light btn center' type="submit" placeholder="Buscar"/>
                </div>
            </form>
                <table className='striped centered responsive-table'>
                    <thead>
                        <tr>
                        <th>NOMBRE</th>
                        <th>DIRECCION</th>
                        <th>NUMERO</th>
                        <th>CEDULA</th>
                        </tr>
                    </thead>
                    <tbody style={{height: '200px'}}>
                        {rows}
                    </tbody>
                </table>
                <button className='center waves-effect waves-light btn center' onClick={addClient}>Seleccionar</button>
                <button className='center waves-effect waves-light btn center' onClick={changeVis}>Volver</button>
                <button className='center waves-effect waves-light btn center' onClick={()=>{setModalVis(!modalVis)}}>Añadir</button>
                {modalVis ? (<ModelCli changeVis={()=>{setModalVis(!modalVis)}} selected={''} choice={1} act={()=>{console.log('Agregado!')}}/>) : null}
            </div>
            </Modal>
        </div>
     );
}
 
export default SearchClient;