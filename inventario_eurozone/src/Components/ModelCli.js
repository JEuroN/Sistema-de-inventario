import React, {useState} from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import './../Assets/App.css'

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

    const [err, setErr] = useState(true);

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
        <div className='container center-align'>
            <Modal isOpen={true} ariaHideApp={false} style={{content: {overflow:'hidden'}}}>
                {err ? (<h4 className='center'>DATOS DEL CLIENTE</h4>) : (<h4 className='center'>Se ha producido un error</h4>)}
                    <form onSubmit={handleSubmit}>
                        <div className='container center-align section'>
                            <div className='row'>
                                <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">account_circle</i>
                                <input className='col s6 push-s2' value={name} onChange={(e)=>{handleName(e.target.value)}} required></input>
                            </div>
                                <label className='black-text'>Nombre</label>
                            <div className='row'>
                                <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">phone_android</i>
                                <input className='col s6 push-s2' value={num} onChange={(e)=>{handleNum(e.target.value)}} required></input>
                            </div>
                                <label className='black-text'>Numero</label>
                            <div className='row'>
                                <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">folder_shared</i>
                                <input className='col s6 push-s2' value={ced} onChange={(e)=>{handleCed(e.target.value)}} required></input>
                            </div>
                                <label className='black-text'>Cedula</label>
                            <div className='row'>
                                <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">find_in_page</i>  
                                <input className='col s6 push-s2' value={adrs} onChange={(e)=>{handleAdrs(e.target.value)}} required></input>
                            </div>
                                <label className='black-text'>Direccion</label>
                        <div className='section'>
                            <button className="center waves-effect waves-light btn center" onClick={(e)=>{props.changeVis(2)}}>Volver</button>
                            <button className="center waves-effect waves-light btn center" type='submit'>Ingresar<i className="material-icons right">send</i></button>
                        </div>
                        </div>
                    </form>
            </Modal>
        </div>
    );

}
 
export default ModelCli;