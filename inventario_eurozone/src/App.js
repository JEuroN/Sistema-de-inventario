import { BrowserRouter, Route } from 'react-router-dom'
import Login from "./Components/login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact route='/' component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
