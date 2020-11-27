import React, {useState} from 'react'
import axios from 'axios'

const PopInv = (props) => {

    const {product_id, product_precio, product_quant, product_name, product_prov, product_codigo} = props.selected;

    const [name, setName] = useState(product_name);

    const handleName = (e) => {
        setName(e)
    }

    const [quant,setQuant] = useState(product_quant);

    const handleQuant = (e) => {
        setQuant(e)
    }

    const [precio, setPrecio] = useState(product_precio);

    const handlePrecio = (e) => {
        setPrecio(e)
    }

    const [prod, setProd] = useState(product_prov)

    const handleProd = (e) => {
        setProd(e)
    }

    const [cod, setCod] = useState(product_codigo);

    const handleCod = (e) => {
        setCod(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {id: product_id, name: name, quant: quant, product_precio: precio, prod: prod, cod: cod};
        console.log(data);
        let body = {choice: props.choice, data: data}
        console.log(body);
        axios("http://localhost:3001/inventario/crud", {
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
                <h2>Inventario</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Nombre</label>
                        <input value={name} onChange={(e)=>{handleName(e.target.value)}} required></input>
                        <label>Cantidad</label>
                        <input value={quant} onChange={(e)=>{handleQuant(e.target.value)}} required></input>
                        <label>Precio</label>
                        <input value={precio} onChange={(e)=>{handlePrecio(e.target.value)}} required></input>
                        <label>Proveedor</label>
                        <input value={prod} onChange={(e)=>{handleProd(e.target.value)}} required></input>
                        <label>Codigo</label>
                        <input value={cod} onChange={(e)=>{handleCod(e.target.value)}} required></input>
                        <input type='submit' value='Proceder' />
                    </form>
                    <button onClick={(e)=>{props.changeVis(2)}}>Volver</button>
            </div>
        </div>
    );

}
 
export default PopInv;