import Register from "./pages/Register";
import Login from "./pages/Login"
import Home from "./pages/Home"
import "./styles.css"
import {
BrowserRouter,Routes,Route
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
function App() {

  const {currentUser}= useContext(AuthContext);
  const ProtectedRoute= ({children})=>{
    if(!currentUser){
      return <Navigate to = "/login"/>
    }

    return children;
  };

  return (
<BrowserRouter>
  <Routes>
    <Route path="/">
      <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path="login" element={<Login />}/>
      <Route path="register" element={<Register />}/>
    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
