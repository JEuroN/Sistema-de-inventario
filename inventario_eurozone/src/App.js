import { BrowserRouter, Route } from 'react-router-dom'
import Personal from "./Components/personal"
import Login from "./Components/login"
import AuthContext from './Context/authContext'
import Inventario from "./Components/Inventario"
import Proveedor from "./Components/Proveedor"
import Cliente from './Components/Cliente'
import Ventas from './Components/ventas'
import Home from './Components/home'
import Navbar from './Components/navBar'
import Factura from './Components/Facturas'
import 'materialize-css/dist/css/materialize.min.css'

function App() {
  return (
    <div className="App">
      <AuthContext>
        <BrowserRouter>
          <Route exact path='/' component={Login} />
          <Navbar />
          <Route exact path='/home' component={Home} />
          <Route exact path='/clients' component={Cliente} />
          <Route exact path='/providers' component={Proveedor} />
          <Route exact path='/inventario' component={Inventario} />
          <Route exact path='/sales' component={Ventas} />
          <Route exact path='/personal' component={Personal} />
          <Route exact path='/factura' component={Factura} />
        </BrowserRouter>
      </AuthContext>
    </div>
  );
}

export default App;
