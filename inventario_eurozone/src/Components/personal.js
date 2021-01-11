import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import PopUp from './modelPers'
import './../Assets/App.css'
import { useHistory } from 'react-router-dom'

const Personal = () => {

    const [Worker, setWorker] = useState([
    {worker_id: 1, worker_name: 'Obteniendo Datos', worker_login:'xxxx-xx-x', worker_number: 'xx', worker_ced: 'xx', worker_charge: "No-asignado"},
    ])

    const [filter, setFilter] = useState('');

    const [visible, setVisible] = useState(false);

    const [data, setData] = useState('');

    const [choice, setChoice] = useState('');

    const {isAuth, isAdmin} = useContext(AuthContext);

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
        getWorkers();
    },[]);

    const getWorkers = () => {
        axios("http://localhost:3001/personal/get", {
            method: 'get',
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            if(res.data.msg.length > 0)
                setWorker(res.data.msg);
            else
                setWorker([
                    {worker_id: 'x', worker_name: 'No se encuentran', worker_login: 'datos'}
                ])
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const select = (id) =>{
        console.log(id);
        let filter = Worker.filter(worker =>{
            return worker.worker_id === id
        })
        setData(filter[0]);
    }

    const rows = Worker.map((worker, index) => {
        const {worker_id, worker_name, worker_login, worker_num, worker_ced, worker_assing} = worker;
        return(
            <tr key={worker_id} onClick={(e)=>{select(worker_id)}} className={worker_id === data.worker_id ? 'light-blue lighten-2' : null}>
                <td>{worker_name}</td>
                <td>{worker_login.split('T')[0]}</td>
                <td>{worker_num}</td>
                <td>{worker_ced}</td>
                <td>{worker_assing}</td>
            </tr>
        )
    })

    const search = Worker.map((worker, index) => {
        const {worker_id, worker_name, worker_login, worker_num, worker_ced, worker_assing} = worker;
        if(worker_name.toLowerCase().includes(filter.toLowerCase()) === true){
            return(
                <tr key={worker_id} onClick={(e)=>{select(worker_id)}} className={worker_id === data.worker_id ? 'light-blue lighten-2' : null}>
                    <td>{worker_name}</td>
                    <td>{worker_login.split('T')[0]}</td>
                    <td>{worker_num}</td>
                    <td>{worker_ced}</td>
                    <td>{worker_assing}</td>
                </tr>
            )
        }else
            return null;
    })

    return ( 
        <div>
            <div className='container'>
                <h2 className='center '>PERSONAL</h2>
                <table className='striped centered responsive-table'>
                    <thead>
                        <tr>
                        <th>NOMBRE</th>
                        <th>ULTIMA ACTIVIDAD</th>
                        <th>NUMERO</th>
                        <th>CEDULA</th>
                        <th>PUESTO</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {filter.length < 1 ? (rows) : (search)}
                    </tbody>
                </table>
            </div>
            {visible ? (<PopUp changeVis={()=>{changeVis(2)}} selected={data} choice={choice} act={getWorkers}/>) : (
            <div className='row container center-align'>    
                <div className='section input-field'>
                    <i className="material-icons col s1 push-s3 prefix">search</i>
                    <input id='search' className='col s4 push-s3 black-text validate' placeholder='Busqueda' onChange={(e)=>{setFilter(e.target.value)}} onDoubleClick={(e)=>{setFilter('')}} />
                </div>
                { isAdmin ? (
                <div className='center row col s12'>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(1)}}>Agregar</button>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(3)}}>Modificar</button>
                    <button className='center waves-effect waves-light btn center' style={{ marginRight: '40px !important' }} onClick={()=>{changeVis(0)}}>Eliminar</button>
                </div>

                ) : null}
                   
            </div>
                )}
        </div>
     );
}
 
export default Personal;