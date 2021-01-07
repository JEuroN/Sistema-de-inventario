import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import './../Assets/App.css'
import SearchProv from './SearchProv'

const PopInv = (props) => {

    const { product_id, product_precio, product_quant, product_name, product_prov, product_codigo } = props.selected;

    const [name, setName] = useState(product_name);

    const [visible, setVisible] = useState(false)

    const handleName = (e) => {
        setName(e)
    }

    const [quant, setQuant] = useState(product_quant);

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

    const [err, setErr] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { id: product_id, name: name, quant: quant, product_precio: precio, prod: prod, cod: cod };
        console.log(data);
        let body = { choice: props.choice, data: data }
        console.log(body);
        axios("http://localhost:3001/inventario/crud", {
            method: 'POST',
            data: body,
            headers: { "Content-Type": "application/json" }
        })
        .then((res) => {
            console.log(res.data.msg)
            if (res.data.msg === false) {
                setErr(false)
            } else {
                console.log(res);
                props.changeVis(2);
                props.act();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const changeVis = (e) =>{
        e.preventDefault();
        setVisible(!visible);
    }


    return (
        <div className='container row center-align'>
            <Modal isOpen={true} ariaHideApp={false} >
                {err ? (<h4 className='center'>DATOS DEL PRODUCTO</h4>) : (<h4 className='center'>Se ha producido un error</h4>)}
                <form onSubmit={handleSubmit}>
                    <div className='container center-align section'>
                        <div className='row'>
                            <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">text_format</i>
                            <input className='col s6 push-s2' value={name} onChange={(e) => { handleName(e.target.value) }} required></input>
                        </div>
                            <label className='black-text'>Nombre</label>
                        <div className='row'>
                            <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">filter_9_plus</i>
                            <input className='col s6 push-s2' value={quant} onChange={(e) => { handleQuant(e.target.value) }} required></input>
                        </div>
                            <label  className='black-text'>Cantidad</label>
                        <div className='row'>
                            <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">local_atm</i>
                            <input className='col s6 push-s2' value={precio} onChange={(e) => { handlePrecio(e.target.value) }} required></input>
                        </div>
                            <label  className='black-text'>Precio</label>
                        <div className='row'>
                            <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">contacts</i>
                            <input className='col s6 push-s2' type='number' value={prod} onChange={(e) => { handleProd(e.target.value) }} required></input>
                            <button className="center waves-effect waves-light btn center col s2 push-s2" onClick={changeVis}>Buscar</button>
                        </div>
                            <label  className='black-text'>Proveedor</label>
                        <div className='row'>
                            <i className="material-icons b col s1 push-s2 teal-text lighten-2-text">assignment</i>
                            <input className='col s6 push-s2' value={cod} onChange={(e) => { handleCod(e.target.value) }} required></input>
                        </div>
                            <label className='black-text'>Codigo</label>
                        <div className='section'>
                            <button className="center waves-effect waves-light btn center" onClick={(e) => { props.changeVis(2) }}>Volver</button>
                            <button className="center waves-effect waves-light btn center" type='submit'>Ingresar<i className="material-icons right">send</i></button>
                        </div>
                    </div>
                </form>
                {visible ? (<Modal isOpen={true} ariaHideApp={false}><SearchProv setProv={handleProd} changeVis={(e)=>{setVisible(!visible)}}/></Modal>) : null}
            </Modal>
        </div>
    );

}

export default PopInv;