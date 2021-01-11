import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import PopProv from './ModelProv'
import {useHistory} from 'react-router-dom'

const Proveedor = () => {

    const [visible, setVisible] = useState(false);

    const [filter, setFilter] = useState('');

    const [provider, setProvider] = useState([
        {provider_id: 'x', provider_name: 'Buscando', provider_prod: 'datos', provider_dir: 'espere', provider_num: 'x', provider_ced: 'x'}
    ]);

    const [data, setData] = useState('');

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
                    setData('')
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
        const {provider_id, provider_name, provider_prod, provider_dir, provider_num, provider_ced} = provider;
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

    const search = provider.map((provider, index) => {
        const {provider_id, provider_name, provider_prod, provider_dir, provider_num, provider_ced} = provider;
        if(provider_ced.toString().includes(filter.toLowerCase()) === true){
            return(
                <tr key={provider_id} onClick={(e)=>{select(provider_id)}} className={provider_id === data.provider_id ? 'light-blue lighten-2' : null}>
                    <td>{provider_name}</td>
                    <td>{provider_ced}</td>
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
            <div className='container'>
                <h2 className='center '>PROVEEDORES</h2>
                <table className='striped centered responsive-table'>
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>CODIGO  </th>
                            <th>PRODUCTO</th>
                            <th>DIRECCION</th>
                            <th>NUMERO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filter.length < 1 ? (rows) : (search)}
                    </tbody>
                </table>
            </div>
            {visible ? (<PopProv changeVis={()=>{changeVis(2)}} selected={data} choice={choice} act={getProviders}/>) : (
            <div className='row container center-align'> 
                <div className='section input-field'>
                    <i className="material-icons col s1 push-s3 prefix">search</i>
                    <input className='col s4 push-s3 black-text validate' placeholder='Busqueda' id='search' onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}} />
                </div>
                <div className='center row col s12'>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(1)}}>Agregar</button>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(3)}}>Modificar</button>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(0)}}>Eliminar</button>
                </div>
            </div>
                )}
        </div>
     );
}
 
export default Proveedor;