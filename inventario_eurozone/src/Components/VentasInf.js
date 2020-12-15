import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import {AuthContext} from '../Context/authContext'
import SearchClient from "./SearchCli";

const VentasInf = () => {

    const {isAuth} = useContext(AuthContext);

    const [client, setClient] = useState('')

    const [clientData, setData] = useState({client_name: 'Introduzca la cedula'});

    const [visible, setVisible] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios("http://localhost:3001/sales/getCli", {
            method: 'POST',
            data: {name: client}, 
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            const { msg } = res.data;
            console.log(msg);
            if(msg !== false)
                setData(msg[0]);
            else
                setData({client_name: 'No encontrado'})
        })
        .catch((err)=>{
            console.log(err);
            setData({client_name: 'No encontrado'});
        })
    }

    const changeVis = () =>{
        setVisible(!visible);
    }

    return ( 
        <div>
            <label>Empleado</label>
            <p>{isAuth}</p>
            <label>Cliente</label>
            <p>{clientData.client_name}</p>
            <form onSubmit={handleSubmit}>
                <input value={client} onChange={(e)=>(setClient(e.target.value))} required/>
                <input type='submit' value='Buscar' />
            </form>
            <button onClick={changeVis}>Buscar</button>
            {visible ? (<SearchClient setnClient={setData} changeVis={changeVis} />) : (null)}
        </div> 
    );
}
 
export default VentasInf;