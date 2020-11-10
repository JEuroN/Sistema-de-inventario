import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import PopProv from './ModelProv'

const Proveedor = () => {

    const {isAdmin} = useContext(AuthContext);

    const [visible, setVisible] = useState(false);

    const [filter, setFilter] = useState('');

    const [provider, setProvider] = useState([
        {provider_id: 'x', provider_name: 'Buscando', provider_prod: 'datos', provider_dir: 'espere', provider_num: 'x'}
    ]);

    const [data, setData] = useState('');

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
        getProviders();
    },[]);

    const getProviders = () => {
        axios("http://localhost:3001/providers/get", {
            method: 'get',
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            if(res.data.msg.length > 0)
            setProvider(res.data.msg);
            else
            setProvider([
                {provider_id: 'x', provider_name: 'No se encuentran', provider_prod: 'datos'}
            ])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const select = (id) =>{
        console.log(id);
        let filter = provider.filter(provider =>{
            return provider.provider_id === id
        })
        setData(filter[0]);
    }

    const rows = provider.map((provider, index) => {
        const {provider_id, provider_name, provider_prod, provider_dir, provider_num} = provider;
        return(
            <tr key={provider_id} onClick={(e)=>{select(provider_id)}}>
                <td>{provider_name}</td>
                <td>{provider_prod}</td>
                <td>{provider_dir}</td>
                <td>{provider_num}</td>
            </tr>
        )
    })

    const search = provider.map((provider, index) => {
        const {provider_id, provider_name, provider_prod, provider_dir, provider_num} = provider;
        if(provider_name.toLowerCase().includes(filter.toLowerCase()) === true){
            return(
                <tr key={provider_id} onClick={(e)=>{select(provider_id)}}>
                    <td>{provider_name}</td>
                    <td>{provider_prod}</td>
                    <td>{provider_dir}</td>
                    <td>{provider_num}</td>
                </tr>
            )
        }else
            return null;
    })

    return ( 
        <div>
            <div>
                <h2>PROVEEDORES</h2>
                <table>
                    <tbody>
                        <tr>
                        <th>NOMBRE</th>
                        <th>PRODUCTO</th>
                        <th>DIRECCION</th>
                        <th>NUMERO</th>
                        </tr>
                        {filter.length < 1 ? (rows) : (search)}
                    </tbody>
                </table>
            </div>
            <div>
                <input onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}} />
                {!isAdmin ? (
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
            {visible ? (<PopProv changeVis={()=>{changeVis(2)}} selected={data} choice={choice} act={getProviders}/>) : null}
        </div>
     );
}
 
export default Proveedor;