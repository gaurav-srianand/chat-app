import React, { useContext, useState } from 'react'
import { collection, getDocs, query, setDoc, where ,doc, updateDoc, serverTimestamp, getDoc, arrayUnion, Timestamp} from "firebase/firestore";
import {db} from "../firebase"
import {AuthContext} from "../context/AuthContext"

const Search=()=> {
  const {currentUser} = useContext(AuthContext);

  const [username, setUsername]= useState("");
  const [user, setUser]= useState(null);

  const [err, setErr]= useState(false);


  
  const handleSearch = async() => {

    const q = query(collection(db, "users"), where("displayName", "==", username));
try{
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  setUser(doc.data());
});}
catch(err1){
  setErr(true);
  console.log(err1);
}
  }

  const handleKey = e=>{
    e.code ==="Enter" && handleSearch();
  };

  const handleSelect = async()=>{
    //check whether the group exist or not, if not create
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{
    const res = await getDoc(doc(db, "chats",combinedId))
    console.log("chats chats checked");
    console.log(res);

    if(!res.exists()){
      //create a chat in chats collection
        console.log("res doesnot exist");
      await setDoc(doc(db,"chats", combinedId),{messages:[]});
      
      //create UserChats
   
  
      await updateDoc(doc(db,"userConnections",currentUser.uid),{
        connections: arrayUnion({
         [combinedId]:{
            userInfo:{
            uid:user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          date:Timestamp.now(),
        },
      })});


      await updateDoc(doc(db,"userConnections",user.uid),{
        connections: arrayUnion({
          [combinedId]:{
            userInfo:{
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          date:Timestamp.now(),
        },
      })});

    }
    }
    catch(err2){
      console.log(err2);
    }

    setUser(null);
    setUsername("");

  }

  return (
    <div className='search'>
        <div className="searchForm">
            <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username} /> 
        </div>
        {err && <span>User not found!</span>}
    {user && <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="User" />
            <div className="userChatInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}

export default Search