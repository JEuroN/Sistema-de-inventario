import React, {useState, useContext, useEffect} from "react"
import axios from "axios"
import { AuthContext } from '../Context/authContext'
import { useHistory } from 'react-router-dom'

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
                    toggleAdmin(res.data.name);
                    history.push('/home');
                break;
                case 1:
                    console.log('goi');
                    toggleAuth(res.data.name);
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
        <div>
            <form onSubmit={handleLogin}>
                <label>Usuario</label>
                <input type="text" placeholder="Usuario" value={User} onChange={(e) => setUser(e.target.value)}></input>
                <label>Contraseña</label>
                <input type="password" placeholder="Contraseña" value={Pass} onChange={(e) => setPass(e.target.value)}></input>
                <input type="submit" value="Ingresar" />
                <h2>{Bool ? ('Por favor ingrese su cuenta y contraseña') : ('Cuenta o contraseña incorrecta')}</h2>
            </form>
        </div>
     );
}
 
export default Login;