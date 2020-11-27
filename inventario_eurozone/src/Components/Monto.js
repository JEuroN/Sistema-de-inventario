import React, {useState, useContext, useEffect} from "react"

const Monto = (props) => {

    const {prop, montoT} = props;

    let precio = prop.length ? (prop[prop.length - 1].precio) : 0;

    return ( 
        <div>
            <label>Ultimo producto</label>
            <p>{precio}</p>
            <label>Monto total</label>
            <p>{montoT}</p>
        </div>
     );
}
 
export default Monto;