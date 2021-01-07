import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../Context/authContext'

function Navbar(){

    const {isAuth, isAdmin} = useContext(AuthContext)
    
    const [active, setActive] = useState('');


    return(
        <div>
        {isAuth ? (
            <nav>
                <div className=' row teal lighten-2'>
                    <ul>
                        <li onClick={()=>{setActive(1)}} className={active === 1 ? 'active' : null}><Link to="/personal"><i className="material-icons left">person</i>Personal</Link></li>
                        <li onClick={()=>{setActive(2)}} className={active === 2 ? 'active' : null}><Link to='/sales'><i className="material-icons left">attach_money</i>Ventas</Link></li>
                        <li onClick={()=>{setActive(3)}} className={active === 3 ? 'active' : null}><Link to='/factura'><i className="material-icons left">account_balance_wallet</i>Facturas</Link></li>
                        { isAdmin ? (<li onClick={()=>{setActive(4)}} className={active === 4 ? 'active' : null}><Link  to='/inventario'><i className="material-icons left">receipt</i>Inventario</Link></li>): null }
                        { isAdmin ? (<li onClick={()=>{setActive(5)}} className={active === 5 ? 'active' : null}><Link  to='/providers'><i className="material-icons left">local_shipping</i>Proveedores</Link></li>): null }
                        { isAdmin ? (<li onClick={()=>{setActive(6)}} className={active === 6 ? 'active' : null}><Link  to='/clients'><i className="material-icons left">people</i>Cliente</Link></li>): null }
                        <div className='col s2 push-s3 left center-align'>
                        <li><Link  to='/'><i className="material-icons left">arrow_back</i>Cerrar sesion</Link></li>
                        </div>
                    </ul>
                </div>

            </nav>
        ) : null }
        </div>
    )
}

export default Navbar;