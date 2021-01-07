import React, { useState, useContext, useEffect } from "react"
import axios from 'axios'
import Modal from 'react-modal'
import './../Assets/App.css'

const DetalleFactura = (props) => {

    const [fact, setFact] = useState([props.selected])

    const [prod, setProd] = useState([])

    const getFact = () => {
        console.log(props.selected)
        axios("http://localhost:3001/factura/getFact", {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            data: { sale: props.selected }
        })
            .then((res) => {
                console.log(res);
                setFact(res.data.info);
                setProd(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(getFact, [])

    const makeClient = () => {
        if (fact[0] !== undefined) {
            const { client_name, client_address, client_number, client_ced } = fact[0]
            return (
                <div className='row'>
                    <div className='col s6'>
                        <label className='teal-text lighten-1-text hb'>NOMBRE</label>
                        <p className='hc'>{client_name}</p>
                    </div>
                    <div className='col s6'>
                        <label className='teal-text lighten-1-text hb'>DIRECCION</label>
                        <p className='hc'>{client_address}</p>
                    </div>
                    <div className='col s6'>
                        <label className='teal-text lighten-1-text hb'>NUMERO</label>
                        <p className='hc'>{client_number}</p>
                    </div>
                    <div className='col s6'>
                        <label className='teal-text lighten-1-text hb'>CEDULA</label>
                        <p className='hc'>{client_ced}</p>
                    </div>
                </div>
            )
        }
    }

    const makeInfo = () => {
        if (fact[0] !== undefined) {
            const { sale_number, sale_date, worker_name, worker_ced } = fact[0]
            return (
                <div className='row border-left'>
                    <div className='col s6 '>
                        <label className='teal-text lighten-1-text hb'>EMPLEADO</label>
                        <p className='hc'>{worker_name}</p>
                    </div>
                    <div className='col s6'>
                        <label className='teal-text lighten-1-text hb'>FECHA</label>
                        <p className='hc'>{sale_date.split('T')[0]}</p>
                    </div>
                    <div className='col s6'>
                        <label className='teal-text lighten-1-text hb'>CEDULA EMPLEADO</label>
                        <p className='hc'>{worker_ced}</p>
                    </div>
                    <div className='col s6'>
                        <label className='teal-text lighten-1-text hb'>NUMERO DE VENTA</label>
                        <p className='hc'>{sale_number}</p>
                    </div>
                </div>
            )
        }
    }

    const rows = prod.map((sale, index) => {
        const { product_name, product_id, product_precio, product_codigo } = sale;
        const { product_quantity } = fact[index]
        return (
            <tr key={product_id}>
                <td>{product_name}</td>
                <td>{product_codigo}</td>
                <td>{product_precio}BsS</td>
                <td>{product_quantity}</td>
            </tr>
        )
    })

    const client = makeClient();

    const worker = makeInfo();

    return (
        <div className='border row'>
            <div className=' section center-align'>
                <button className='center waves-effect waves-light btn center' onClick={props.changeVis}>Volver</button>
            </div>
            <div className='row container center-align col s6'>
                <div className='col s6'>
                    <h2>CLIENTE</h2>
                    {client}
                </div>
                <div className='col s6'>
                    <h2>VENTA</h2>
                    {worker}
                </div>
            </div>
            <div className='center container center-align section row col s6'>
                <div className='section col s12'>
                    <h2>PRODUCTOS</h2>
                    <table className='striped centered'>
                        <thead>
                            <tr>
                                <th>NOMBRE</th>
                                <th>CODIGO</th>
                                <th>PRECIO</th>
                                <th>CANTIDAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row section center center-align section col s3 push-s1'>
                <div className='col s8'>
                    <span className='black-text ha'>MONTO TOTAL</span>
                </div>
                <div className='col s1'>
                    <span className='hc'>{fact[0].sale_amount}BsS</span>
                </div>
            </div>

        </div>
    );
}

export default DetalleFactura;