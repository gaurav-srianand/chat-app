import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';

function Chats() {

  const [chats,setChats]=useState([]);
  const {currentUser} =useContext(AuthContext)
  const {dispatch} =useContext(ChatContext)
  const {data}= useContext(ChatContext);

  useEffect(()=>{
   const getChats=()=>{
    console.log("Get chats called");
    const unsub = onSnapshot(doc(db, "userConnections", currentUser.uid), (doc) => {
      doc.exists() && setChats(doc.data().connections);
      console.log(doc);
    });

   
    
    return ()=>{
      unsub();
    }; 

   };
   currentUser && getChats(); 
  }, [currentUser.uid]); 
    

  
  const handleSelect =(u)=>{
    dispatch({type:"CHANGE_USER", payload: u });
  };
let achat= {};

console.log("chats", chats);
function handleMap(a)
{
  achat=a;
console.log("obj ntries",Object.entries(a));
  console.log("achat",achat);
  Object.entries(a).map((val)=>{
    console.log("val",val[1]);

      console.log("achat",achat);
  })

}
chats.map((a)=>{

  handleMap(a);

})


console.log("achat",achat);
  return (
  
    <div className='chats'>
      {/* {chats.map((a)=>(<HandleMap props={a} />))} */}
      {chats?.map(chatObject=>( 
          Object.entries(chatObject)?.map(chat=>(
            <div className= {`userChat ${chat[1].userInfo.displayName === data.user.displayName && "currentUser"}`} key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="User" />
            <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
            </div>))  
            ))}
    </div>
  )
}

export default Chats



// <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
// <img src={chat[1].userInfo.photoURL} alt="User" />
// <div className="userChatInfo">
//     <span>{chat[1].userInfo.displayName}</span>
//     <p>{chat[1].lastMessage?.text}</p>
// </div>
// </div>