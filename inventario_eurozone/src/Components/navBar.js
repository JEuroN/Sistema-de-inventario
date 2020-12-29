import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../Context/authContext'

function Navbar(){

    const {isAuth, isAdmin} = useContext(AuthContext)
    return(
        <nav>
            {isAuth ? (
                <div>
                <div>
                    <ul>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to="/personal">Personal</Link></li>
                        <li><Link to='/sales'>Ventas</Link></li>
                        <li><Link to='/factura'>Facturas</Link></li>
                        { isAdmin ? (<li><Link  to='/inventario'>Inventario</Link></li>): null }
                        { isAdmin ? (<li><Link  to='/providers'>Proveedores</Link></li>): null }
                        { isAdmin ? (<li><Link  to='/clients'>Cliente</Link></li>): null }
                        <li><Link  to='/'>Cerrar sesion</Link></li>
                    </ul>
                </div>
                <div>
                    <p>{isAuth}</p>
                </div>
                </div>
            ) : null }

        </nav>
    )
}

export default Navbar;