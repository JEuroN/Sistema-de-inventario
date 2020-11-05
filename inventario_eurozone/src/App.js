import { BrowserRouter, Route } from 'react-router-dom'
import Personal from "./Components/personal"
import AuthContext from './Context/authContext'

function App() {
  return (
    <div className="App">
      <AuthContext>
        <BrowserRouter>
          <Route exact route='/' component={Personal} />
        </BrowserRouter>
      </AuthContext>
    </div>
  );
}

export default App;
