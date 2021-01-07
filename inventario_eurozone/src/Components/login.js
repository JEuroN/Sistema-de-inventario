import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import { useHistory } from 'react-router-dom'
import './../Assets/App.css'

const Login = () => {

    const [User, setUser] = useState('');
    const [Pass, setPass] = useState('');
    const [Bool, setBool] = useState(true);

    const {toggleAuth, toggleAdmin, resetState } = useContext(AuthContext);

    const history = useHistory();

    useEffect(resetState, [])

    const handleLogin = (e) => {
        e.preventDefault();
        let body = {name: User, pass: Pass}
        axios("http://localhost:3001/login", {
            method: 'POST',
            data: body, 
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => {
            console.log(res.data);
            switch(res.data.msg){
                case 0:
                    console.log('gei');
                    toggleAdmin(res.data.name, res.data.id);
                    history.push('/home');
                break;
                case 1:
                    console.log('goi');
                    toggleAuth(res.data.name, res.data.id);
                    console.log(res.data);
                    history.push('/home');
                break;
                default:
                    console.log('boi');
                    if(Bool===true)
                    setBool(!Bool);
                break;
            }
        })
        .catch((res) => {
            console.log(res);
        })
    }

    return ( 
            <div className='row center-align'>
                <div className='container'>
                    <h2 className='center blue-grey-text text-darken-3'>Eurozone</h2>
                <form onSubmit={handleLogin}>
                    <div className='container center-align section row'>
                        <input className='center col s6 push-s3 section' id='user' type="text" placeholder="Usuario" value={User} onChange={(e) => setUser(e.target.value)}></input>
                    </div>
                    <div className='container center-align section row'>
                        <input className='center col s6 push-s3 section' id='pass' type="password" placeholder="Contraseña" value={Pass} onChange={(e) => setPass(e.target.value)}></input>
                    </div>
                    <div className='section'>
                    {Pass ? (<button className="center waves-effect waves-light btn center" type="submit">Ingresar
                        <i className="material-icons right">send</i>
                    </button>) : (<button className="center btn disabled margin-top-12px" type="submit">Ingresar
                        <i className="material-icons right">send</i>
                    </button>)}
                    </div>
                        {Bool ? (<h3 className='center blue-grey-text text-darken-3'>Por favor ingrese su usuario y contraseña</h3>) : (<h3 className='center red-text text-darken-1'>Usuario o contraseña incorrecta</h3>)}
                </form>
                </div>
            </div>
     );
}
 
export default Login;