import logo from './logo.svg';
import './App.css';
import './styles.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { Route, BrowserRouter, Routes, Navigate, } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const currUser = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if (!currUser) {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/' >
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute> 
              }
            />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
