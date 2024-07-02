import React, { useContext } from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input' 
import { ChatContext } from '../context/ChatContext'
function Chat() {
  const {data} = useContext(ChatContext);
  var flag= true;
  if(data.chatId==null){
    flag= true;
  }
  else{
    flag= false;
  }
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className='chatIcons'>
         <img style={{height:"20px",cursor:"pointer",margin:"8px"}} className='imgg' src={Cam} alt="" />
         <img style={{height:"20px",cursor:"pointer",margin:"8px"}} className='imgg' src={Add} alt="" />
         <img style={{height:"20px",cursor:"pointer",margin:"8px"}} src={More} alt="" className='imgg'/>
        </div>
      </div>
      <div>
        {flag?<div className="messages nochat">Click a user to see chats</div>:<Messages/>}
        <Input/>
      </div>
    </div>
  )
}

export default Chat