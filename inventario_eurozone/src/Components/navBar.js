import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../Context/authContext'
import './../Assets/navbar.css'

function Navbar(){

    const {isAuth, isAdmin} = useContext(AuthContext)
    
    const [active, setActive] = useState('');

    useEffect(() => {
        setActive(2)
    }, [])

    return(
        <div>
        {isAuth ?
            (<div className='teal lighten-2'>
                    <ul className='right center-align uls' className={active===2 ? 'topMarginOff': 'topMarginOn' }>
                    <h5 className=' center white-text'>EZ</h5>
                        <li className={active === 1 ? 'active' : null}><Link onClick={()=>{setActive(1)}} to="/personal"><i className="material-icons left">person</i></Link></li>
                        <li className={active === 2 ? 'active' : null}><Link onClick={()=>{setActive(2)}} to='/sales'><i className="material-icons left">attach_money</i></Link></li>
                        <li className={active === 3 ? 'active' : null}><Link onClick={()=>{setActive(3)}} to='/factura'><i className="material-icons left">account_balance_wallet</i></Link></li>
                        { isAdmin ? (<li className={active === 4 ? 'active' : null}><Link onClick={()=>{setActive(4)}} to='/inventario'><i className="material-icons left">receipt</i></Link></li>): null }
                        { isAdmin ? (<li className={active === 5 ? 'active' : null}><Link onClick={()=>{setActive(5)}} to='/providers'><i className="material-icons left">local_shipping</i></Link></li>): null }
                        { isAdmin ? (<li className={active === 6 ? 'active' : null}><Link onClick={()=>{setActive(6)}} to='/clients'><i className="material-icons left">people</i></Link></li>): null }
                        <li><Link  to='/'><i className="material-icons left">arrow_back</i></Link></li>
                    </ul>
                </div>
        ) : null }
        </div>
    )
}

export default Navbar;