import React, {useState} from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import './../Assets/App.css'

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

    const [err, setErr] = useState(true);

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
                {err ? (<h4 className='center'>DATOS DEL EMPLEADO</h4>) : (<h4 className='center'>Se ha producido un error</h4>)}
                    <form onSubmit={handleSubmit}>
                        <div className='container center-align section'>
                        <div className='row'>
                            <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">account_circle</i>
                            <input id='nombre' className='col s6 push-s2' value={name} onChange={(e)=>{handleName(e.target.value)}} required></input>
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
                        <div  className='row'>
                            <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">find_in_page</i>
                            <input className='col s6 push-s2' value={char} onChange={(e)=>{handleChar(e.target.value)}} required></input>
                        </div>
                            <label className='black-text'>Puesto</label>
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
 
export default PopUp;