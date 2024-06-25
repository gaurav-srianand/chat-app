import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; 

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Chat-App</span>
            <span className='title'>Login</span>
            <form onSubmit={submitHandler}>
                <input type='email' placeholder='E-mail' />
                <input type='password' placeholder='Password' />
                <button type='submit' >Sign In</button>
            </form>
        <p>You don't have an account? <Link to='/register'>Register</Link></p>
        {err && <span>Something went wrong!!</span>}
        </div>
    </div> 
  )
}

export default Login