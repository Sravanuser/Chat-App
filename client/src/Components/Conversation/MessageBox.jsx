import React from 'react'
import useSendMessages from '../../Hooks/MessageHooks/useSendMessages';
import { useState } from 'react';
import { IoSendSharp } from "react-icons/io5";

export default function MessageBox() {
    const [message,setMessage] = useState(""); 
    const {loading,sendMessage} = useSendMessages();
    async function send(e){
      e.preventDefault(); 
      if(!message) return; 
      await sendMessage(message);
        setMessage("");
    }
    const handleKeyPress = async(event) => {
      if (event.key === 'Enter') {
        await sendMessage(message);
        setMessage("");
      }
    };
  return (
    <div className='input_message'>
      <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)}  onKeyPress={handleKeyPress}/>
        <IoSendSharp onClick={send} size={27}/>
    </div>
  )
}
