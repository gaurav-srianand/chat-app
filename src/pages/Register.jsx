import React,{useState} from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from "../firebase"
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';



const Register = () => {

  const [err,setErr] = useState(false);
  const navigate= useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(e)
    const displayName= e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

try{
const res= await createUserWithEmailAndPassword(auth, email, password);
console.log(res.user.uid);

const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:

uploadTask.on(
  (error)=>{
    // Handle unsuccessful uploads
    console.log(error)
    setErr(true);
  }, 
  () => {
 
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      await updateProfile(res.user,{
        displayName,
        photoURL: downloadURL,
      })

      

// Add a new document in collection "cities"
await setDoc(doc(db, "users", res.user.uid), {
  uid: res.user.uid,
  displayName,
  email,
  photoURL: downloadURL,
});
console.log("user set!");
await setDoc(doc(db, "userConnections", res.user.uid),{connections:[]});

navigate("/");
});
  }
 
);

}
catch(err){
  console.log(err.message);
setErr(true);
}
  }

  return (
    <div className='formContainer'>
    <div className="formWrapper">
    <span className= "logo">ssup!</span>
    <span className='title'>Register</span>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="display name"></input>
        <input type="email" placeholder='email'></input>
        <input type="password" placeholder='password'></input>
        <input style={{display:"none"}} type="file" id="file"></input>
        <label htmlFor='file'><img src={Add} alt="">
        </img>
        <span>Add an avatar</span></label>
        <button>Sign up</button>
        {err && <span>Something went wrong</span>}
    </form>
    <p>You do have an account? <Link to ="/login">Login</Link></p>
    </div>
    </div>
  )
}

export default Register