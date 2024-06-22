import React, { useState } from 'react';
import Add from '../img/add.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress, paused, and resumed states here if needed
        }, 
        (error) => {
          setErr(true);
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL
          });
          await setDoc(doc(db, "userChats", res.user.uid), { });
          navigate("/");
        }
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chat-App</span>
        <span className='title'>Register</span>
        <form onSubmit={submitHandler}>
          <input type='text' placeholder='Enter Name Here' />
          <input type='email' placeholder='E-mail' />
          <input type='password' placeholder='Password' />
          <input style={{ display: 'none' }} type='file' id='file' />
          <label htmlFor='file'>
            <img src={Add} alt="Add Avatar" />
            <span>Add an Avatar</span>
          </label>
          <button type='submit'>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
        {err && <span>Something went wrong!!</span>}
      </div>
    </div>
  );
};

export default Register;
