import React, {useState} from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import './../Assets/App.css'

const PopProv = (props) => {

    const {provider_id, provider_name, provider_prod, provider_dir, provider_num, provider_ced} = props.selected;

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

    const [ced, setCed] = useState(provider_ced)

    const handleCed = (e)=> {
        setCed(e);
    }

    const [err, setErr] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {id: provider_id, name: name, prod: prod, num: num, dir: dir, ced: ced, lced: provider_ced};
        console.log(data);
        let body = {choice: props.choice, data: data}
        console.log(body);
        axios("http://localhost:3001/providers/crud", {
            method: 'POST',
            data: body, 
            headers: {"Content-Type": "application/json"}
        })
        .then((res)=>{
            if(res.data.msg===false){
                setErr(false)
            }else{
                console.log(res);
                props.changeVis(2);
                props.act();
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    return (
        <div className='container row center-align'>
            <Modal isOpen={true} ariaHideApp={false}>
                {err ? (<h4 className='center'>DATOS DEL PROVEEDOR</h4>) : (<h4 className='center'>Se ha producido un error</h4>)}                    <form onSubmit={handleSubmit}>
                        <div className='container center-align section'>
                            <input value={ced} onChange={(e)=>{handleCed(e.target.value)}} required></input>
                            <label>Codigo</label>
                            <input value={name} onChange={(e)=>{handleName(e.target.value)}} required></input>
                            <label>Nombre</label>
                            <input value={prod} onChange={(e)=>{handleProd(e.target.value)}} required></input>
                            <label>Productos</label>
                            <input value={dir} onChange={(e)=>{handleDir(e.target.value)}} required></input>
                            <label>Direccion</label>
                            <input value={num} onChange={(e)=>{handleNum(e.target.value)}} required></input>
                            <label>Numero</label>
                        <div className='section'>
                            <button className="center waves-effect waves-light btn center" onClick={(e)=>{props.changeVis(2)}}>Volver</button>
                            <button className="center waves-effect waves-light btn center" type='submit'>Ingresar<i className="material-icons right">send</i></button>                        </div>
                        </div>
                    </form>
                   
            </Modal>
        </div>
    );

}
 
export default PopProv;