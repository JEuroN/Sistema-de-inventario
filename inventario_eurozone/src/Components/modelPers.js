import React from 'react'

const PopUp = (props) => {
    

        const {worker_id, worker_name, worker_login, worker_num, worker_ced, worker_assing} = props.selected;
        const form = (
            <form>
                <label>Nombre</label>
                <input placeholder={worker_name}></input>
                <label>Numero</label>
                <input placeholder={worker_num}></input>
                <label>Cedula</label>
                <input placeholder={worker_ced}></input>
                <label>Puesto</label>
                <input placeholder={worker_assing}></input>
            </form>
        )

    return (
        <div>
            <div>
                <span>Ingrese los datos</span>
                    {form}
                <button onClick={props.changeVis}>Volver</button>
                <button>Proceder</button>
            </div>
        </div>
    );
}
 
export default PopUp;