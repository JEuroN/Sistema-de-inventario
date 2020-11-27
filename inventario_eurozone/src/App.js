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
        </BrowserRouter>
      </AuthContext>
    </div>
  );
}

export default App;
