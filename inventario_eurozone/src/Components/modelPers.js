import React, {useState} from 'react'
import axios from 'axios'

const PopUp = (props) => {

    const {worker_id, worker_name, worker_num, worker_ced, worker_assing} = props.selected;

    const [name, setName] = useState(worker_name);

    const handleName = (e) => {
        setName(e)
    }

    const [num,setNum] = useState(worker_num);

    const handleNum = (e) => {
        setNum(e)
    }

    const [ced, setCed] = useState(worker_ced);

    const handleCed = (e) => {
        setCed(e)
    }

    const [char, setChar] = useState(worker_assing)

    const handleChar = (e) => {
        setChar(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {id: worker_id, name: name, numero: num, ced: ced, puesto: char};
        console.log(data);
        let body = {choice: props.choice, data: data}
        console.log(body);
        axios("http://localhost:3001/personal/crud", {
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
                <h2>Datos del empleado</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input value={name} onChange={(e)=>{handleName(e.target.value)}} required></input>
                        <label>Numero</label>
                        <input value={num} onChange={(e)=>{handleNum(e.target.value)}} required></input>
                        <label>Cedula</label>
                        <input value={ced} onChange={(e)=>{handleCed(e.target.value)}} required></input>
                        <label>Puesto</label>
                        <input value={char} onChange={(e)=>{handleChar(e.target.value)}} required></input>
                        <input type='submit' value='Proceder' />
                    </form>
                    <button onClick={(e)=>{props.changeVis(2)}}>Volver</button>
            </div>
        </div>
    );

}
 
export default PopUp;