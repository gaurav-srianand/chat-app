import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>Chat-App</span>
        <div className='user'>
            <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800' />
            <span>John</span>
            <button onClick={() => signOut(auth)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar 