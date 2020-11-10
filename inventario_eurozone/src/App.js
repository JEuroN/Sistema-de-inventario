import { BrowserRouter, Route } from 'react-router-dom'
// import Personal from "./Components/personal"
// import Login from "./Components/login"
import AuthContext from './Context/authContext'
// import Inventario from "./Components/Inventario"
// import Proveedor from "./Components/Proveedor"
import Ventas from './Components/ventas'

function App() {
  return (
    <div className="App">
      <AuthContext>
        <BrowserRouter>
          <Ventas />
        </BrowserRouter>
      </AuthContext>
    </div>
  );
}

export default App;
