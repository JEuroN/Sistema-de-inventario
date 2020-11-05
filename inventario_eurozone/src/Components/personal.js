import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import PopUp from './modelPers'

const Personal = () => {

    const [Worker, setWorker] = useState([
    {worker_id: 1, worker_name: 'Obteniendo Datos', worker_login:'xxxx-xx-x', worker_number: 'xx', worker_ced: 'xx', worker_charge: "No-asignado"},
    ])

    let {isAdmin} = useContext(AuthContext);

    const [visible, setVisible] = useState(false);

    const [data, setData] = useState('');

    const changeVis = (add) => {
        if(data.length !== 0 || add === true)
            setVisible(!visible);
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
            setWorker(res.data.msg);
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
            <tr key={worker_id} onClick={(e)=>{select(worker_id)}}>
                <td>{worker_name}</td>
                <td>{worker_login.split('T')[0]}</td>
                <td>{worker_num}</td>
                <td>{worker_ced}</td>
                <td>{worker_assing}</td>
            </tr>
        )
    })


    return ( 
        <div>
            <div>
                <table>
                    <tbody>
                        <tr>
                        <th>NAME</th>
                        <th>ULTIMA CONEXION</th>
                        <th>NUMERO</th>
                        <th>CEDULA</th>
                        <th>PUESTO</th> 
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
            <div>
                {!isAdmin ? (
                    <div>
                        <button onClick={()=>{changeVis(true)}}>Agregar</button>
                        <button onClick={()=>{changeVis(false)}}>Modificar</button>
                        <button onClick={()=>{changeVis(false)}}>Eliminar</button>
                        <button>Volver</button>
                    </div>
                    ) : (
                        <button onClick={()=>{changeVis(false)}}>Volver</button>               
                    )}
            </div>
            {visible ? (<PopUp changeVis={changeVis} selected={data} />) : null}
        </div>
     );
}
 
export default Personal;