import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import {AuthContext} from '../Context/authContext'
import SearchClient from "./SearchCli";

const VentasInf = (props) => {

    const {isAuth} = useContext(AuthContext);

    const [client, setClient] = useState('')

    const {clientData, setData, setOff, off} = props;

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

    const changeVis = (e) =>{
        e.preventDefault();
        setVisible(!visible);
        setOff(!off)
    }

    return ( 
        <div className='center center-align'>
            <div className='row'>
                <div className='col s6'>
                    <h3>Empleado</h3>
                    <h5>{isAuth}</h5>
                </div>
                <div className='col s6 pull-s1'>
                    <h3>Cliente</h3>
                    {clientData.client_ced ? (<h5>{clientData.client_name} - {clientData.client_ced}</h5>) : (<h5>{clientData.client_name}</h5>)}
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='col s12'>
                    <i className="material-icons col s1 push-s2 prefix">search</i>
                    <input className='col s6 push-s2 black-text validate' value={client} onChange={(e)=>(setClient(e.target.value))} required/>
                </div>
                { off ? (<div className='col s12'>
                    <button className='center waves-effect waves-light btn center' type='submit'>Seleccionar</button>
                    <button className='center waves-effect waves-light btn center' onClick={changeVis}>Buscar</button>
                </div>) : null}
            </form>
            {visible ? (<SearchClient setnClient={setData} changeVis={changeVis} />) : (null)}
        </div> 
    );
}
 
export default VentasInf;