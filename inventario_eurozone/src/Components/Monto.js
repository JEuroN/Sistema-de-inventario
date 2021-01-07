import React, {useState, useContext, useEffect} from "react"

const Monto = (props) => {

    const {prop, montoT} = props;

    let precio = prop.length ? (prop[prop.length - 1].precio) : 0;
    let name = prop.length ? (prop[prop.length - 1].name) : 'No existe';

    return ( 
        <div className='section container row' style={{position: 'relative', marginLeft: '90px'}}>
            <div className='col s12'>
                <h5>Ultimo producto</h5>
                <p>{name} - {precio}BsS</p>
            </div>
            <div className='col s12'>
                <h5>Monto total</h5>
                <p>{montoT}BsS</p>
            </div>
        </div>
     );
}
 
export default Monto;