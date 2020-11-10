import React, {useState} from 'react'
import axios from 'axios'

const PopProv = (props) => {

    const {provider_id, provider_name, provider_prod, provider_dir, provider_num} = props.selected;

    const [name, setName] = useState(provider_name);

    const handleName = (e) => {
        setName(e)
    }

    const [prod,setProd] = useState(provider_prod);

    const handleProd = (e) => {
        setProd(e)
    }

    const [dir, setDir] = useState(provider_dir);

    const handleDir = (e) => {
        setDir(e)
    }

    const [num, setNum] = useState(provider_num)

    const handleNum = (e) => {
        setNum(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {id: provider_id, name: name, prod: prod, num: num, dir: dir};
        console.log(data);
        let body = {choice: props.choice, data: data}
        console.log(body);
        axios("http://localhost:3001/providers/crud", {
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
                <h2>Proveedor</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input value={name} onChange={(e)=>{handleName(e.target.value)}} required></input>
                        <label>Productos</label>
                        <input value={prod} onChange={(e)=>{handleProd(e.target.value)}} required></input>
                        <label>Direccion</label>
                        <input value={dir} onChange={(e)=>{handleDir(e.target.value)}} required></input>
                        <label>Numero</label>
                        <input value={num} onChange={(e)=>{handleNum(e.target.value)}} required></input>
                        <input type='submit' value='Proceder' />
                    </form>
                    <button onClick={(e)=>{props.changeVis(2)}}>Volver</button>
            </div>
        </div>
    );

}
 
export default PopProv;