import React from 'react'
import useConversation from '../../Zustand/Zustand'
import { FcVideoCall } from "react-icons/fc";
import { IoCallSharp } from "react-icons/io5";

export default function MessageBar({ setShow }) {
  const { selectedConversation } = useConversation();
  return (
    <div className='header'>
      <div className='userDetails'>
      <img src={selectedConversation.profilePic} alt="image" className='profilePic userProfile' onClick={() => setShow(true)} />
      <p>{selectedConversation.username}</p>
      </div>
      <div className='Additional'>
        <FcVideoCall size={25}/>
        <IoCallSharp size={20} color='green'/>
      </div>
    </div>
  )
}
