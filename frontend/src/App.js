import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/userAuthContext';

import Home from './pages/Home';
import Feed from './pages/Feed';
import Nav from './components/Navi/Navi'
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {

  const {user} =useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <div className='pages'>
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
        <Route
        path='/feed' 
        element={user ? <Feed /> : <Navigate to="/login" />} 
        />
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
