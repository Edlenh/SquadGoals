import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/userAuthContext';

import Home from './pages/Home';
import Nav from './components/Navi';
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {
  const {user} =useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <div className='pages'>
      <h1>Wow look at my goals</h1>
      <Routes>
        <Route 
        path='/'
        element={user? <Home /> : <Navigate to="/login"/>}
        />
        <Route
        path='/login'
        element={!user? <Login /> :<Navigate to="/"/>} 
        />
        <Route 
        path='/signup' 
        element={!user? <SignUp /> :<Navigate to="/"/>}
        />
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
