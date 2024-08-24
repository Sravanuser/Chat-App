import React from 'react'
import useConversation from "../../Zustand/Zustand";

export default function User({ item }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === item._id;
  return (
    <div className='user' onClick={() => setSelectedConversation(item)} style={{ backgroundColor: isSelected && 'rgb(19, 185, 240)'}}>
      <img src={item.profilePic} alt="images" className='profilePic' />
      <p className='username'>{item.username}</p>
    </div>
  )
}
