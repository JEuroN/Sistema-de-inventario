import React, {useState, useContext, useEffect} from "react"
import axios from 'axios'
import Modal from 'react-modal'
import './../Assets/App.css'

const SearchProd = (prop) => {   

    const [prod, setProd] = useState('');

    const [product, setProduct] = useState([
        {product_id: '', product_precio: '', product_quant: '', product_name: '', product_codigo: ''}
    ]);

    const [data, setData] = useState('');

    const {list, setList, changeVis} = prop;

    const handleSubmit = (e) =>{
        e.preventDefault();
         axios("http://localhost:3001/inventario/crud", {
             method: 'POST',
             data: {data: prod, choice: 4}, 
             headers: {"Content-Type": "application/json"}
         })
         .then((res)=>{
            console.log(res);
            if(res.data.msg.length > 0)
                setProduct(res.data.msg);
            else
                setProduct([
                    {product_id: 'x', product_name: 'No se encuentran', product_quant: 'datos'}
                ])
         })
         .catch((err)=>{
             console.log(err);
         })

    }

    const AddProd = () => {
        console.log(data);
        let {product_name, product_precio, product_id, product_codigo, product_quant, product_prov} = data;
        const exist = list.findIndex(item => item.name === product_name);
        console.log(exist);
        if(exist === -1){
            if(list[0] === undefined || list[0].key === -1 )
                setList([{name: product_name, precio: product_precio, key: product_id, cod: product_codigo, cant: 1, exis: product_quant, prov: product_prov}])
            else
                setList([...list, {name: product_name, precio: product_precio, key: product_id, cod: product_codigo, cant: 1, exis: product_quant, prov: product_prov}])
        }
        else{
            let newArray = [...list];
            let Arr = {...newArray[exist]};
            Arr.cant += 1;
            newArray[exist] = Arr;
            setList(newArray);
        }
    }

    const select = (id) =>{
        console.log(id);
        let filter = product.filter(product =>{
            return product.product_id === id
        })
        setData(filter[0]);
    }


    const rows = product.map((product, index) => {
        const {product_id, product_name, product_quant, product_precio, product_codigo} = product;
        return(
            <tr key={product_id} onClick={(e)=>{select(product_id)}} className={product_id === data.product_id ? 'light-blue lighten-2' : null}>
                <td>{product_name}</td>
                <td>{product_quant}</td>
                <td>{product_precio}</td>
                <td>{product_codigo}</td>
            </tr>
        )
    })
     
    return ( 
    <div className='container'>
        <Modal isOpen={true} ariaHideApp={false}>
        <div className='center'>
        <h2 className='center'>INVENTARIO</h2>
            <form onSubmit={handleSubmit}>
            <div className='row'>
                <input className='col s4 push-s4 black-text validate' value={prod} onChange={(e)=>{setProd(e.target.value)}} />
                <input className='col s1 push-s4 center waves-effect waves-light btn center' type="submit" value="Buscar"/>
            </div>
            </form>
                <table className='striped centered responsive-table'>
                    <thead>
                        <tr>
                        <th>NOMBRE</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>CODIGO</th>
                        </tr>
                    </thead>
                    <tbody style={{height: '200px'}}>
                        {rows}
                    </tbody>
                </table>
                <button className='center waves-effect waves-light btn center' onClick={AddProd}>Seleccionar</button>
                <button className='center waves-effect waves-light btn center' onClick={changeVis}>Volver</button>
            </div>
            </Modal>
    </div> 
    );
}
 
export default SearchProd;