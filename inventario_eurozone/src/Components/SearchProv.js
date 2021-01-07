import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import Modal from 'react-modal'
import './../Assets/App.css'

const SearchProv = (props) => {

    const [name, setName] = useState('');

    const [provider, setProvider] = useState([
        {provider_id: '', provider_name: '', provider_prod: '', provider_dir: '', provider_num: '', provider_ced: ''}
    ]);

    const [data, setData] = useState('');

    const {setProv, changeVis} = props;

    const select = (id) =>{
        console.log(id);
        let filter = provider.filter(provider =>{
            return provider.provider_id === id
        })
        setData(filter[0]);
    }


    const rows = provider.map((client, index) => {
        const {provider_id, provider_name, provider_prod, provider_dir, provider_num, provider_ced} = client;
        return(
            <tr key={provider_id} onClick={(e)=>{select(provider_id)}} className={provider_id === data.provider_id ? 'light-blue lighten-2' : null}>
                <td>{provider_name}</td>
                <td>{provider_ced}</td>
                <td>{provider_prod}</td>
                <td>{provider_dir}</td>
                <td>{provider_num}</td>
            </tr>
        )
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        axios("http://localhost:3001/providers/crud", {
            method: 'POST',
            data: {data: name, choice: 4}, 
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            if(res.data.msg.length > 0)
                setProvider(res.data.msg);
            else
                setProvider([
                    {client_id: 'x', client_name: 'No se encuentran', client_address: 'datos'}
                ])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const addProv = () => {
        setProv(data.provider_ced);
        changeVis();
    }

    return ( 
        <div className='container'>
            <div className='center'>
            <h2>PROVEEDORES</h2>
            <div class='row'>
                <form onSubmit={handleSubmit}>
                    <input className='col s4 push-s3 black-text validate' placeholder='Busqueda' value={name} onChange={(e)=>{setName(e.target.value)}} />
                    <input className='center waves-effect waves-light btn center' type="submit" value="Buscar"/>
                </form>
            </div>
                <table className='striped centered responsive-table'>
                    <thead>
                        <tr>
                        <th>NOMBRE</th>
                        <th>CODIGO</th>
                        <th>PRODUCTO</th>
                        <th>DIRECCION</th>
                        <th>NUMERO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
                <div className='center row col s12'>
                    <button className='center waves-effect waves-light btn center' onClick={addProv}>Seleccionar</button>
                    <button className='center waves-effect waves-light btn center' onClick={changeVis}>Volver</button>
                </div>
            </div>
        </div>
     );
}
 
export default SearchProv;