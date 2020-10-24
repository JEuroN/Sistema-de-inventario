import React,{ useState } from "react"

const Login = () => {

    const [User, setUser] = useState('');
    const [Pass, setPass] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(User, Pass);
        
    }

    return ( 
        <div>
            <form onSubmit={handleLogin}>
                <label>Usuario</label>
                <input type="text" placeholder="Usuario" value={User} onChange={(e) => setUser(e.target.value)}></input>
                <label>Contraseña</label>
                <input type="password" placeholder="Contraseña" value={Pass} onChange={(e) => setPass(e.target.value)}></input>
                <input type="submit" value="Ingresar" />
            </form>
        </div>
     );
}
 
export default Login;