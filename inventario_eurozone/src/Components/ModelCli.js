import React, {useState} from 'react'
import axios from 'axios'

const ModelCli = (props) => {
    const {client_id, client_name, client_address, client_number, client_ced} = props.selected;

    const [name, setName] = useState(client_name);

    const handleName = (e) => {
        setName(e)
    }

    const [num,setNum] = useState(client_number);

    const handleNum = (e) => {
        setNum(e)
    }

    const [ced, setCed] = useState(client_ced);

    const handleCed = (e) => {
        setCed(e)
    }

    const [adrs, setAdrs] = useState(client_address)

    const handleAdrs = (e) => {
        setAdrs(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {id: client_id, name: name, numero: num, ced: ced, adrs: adrs};
        console.log(data);
        let body = {choice: props.choice, data: data}
        console.log(body);
        axios("http://localhost:3001/clients/crud", {
            method: 'POST',
            data: body, 
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            console.log(res);
            props.changeVis(2);
            props.act();
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    return (
        <div>
            <div>
                <h2>Datos del cliente</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input value={name} onChange={(e)=>{handleName(e.target.value)}} required></input>
                        <label>Numero</label>
                        <input value={num} onChange={(e)=>{handleNum(e.target.value)}} required></input>
                        <label>Cedula</label>
                        <input value={ced} onChange={(e)=>{handleCed(e.target.value)}} required></input>
                        <label>Direccion</label>
                        <input value={adrs} onChange={(e)=>{handleAdrs(e.target.value)}} required></input>
                        <input type='submit' value='Proceder' />
                    </form>
                    <button onClick={(e)=>{props.changeVis(2)}}>Volver</button>
            </div>
        </div>
    );

}
 
export default ModelCli;