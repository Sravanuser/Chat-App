import React from 'react'
import useConversation from '../../Zustand/Zustand'

export default function Modal({setShow}) {
  const { selectedConversation } = useConversation();
  return (
    <div className='modal' onClick={()=>{setShow(false)}}>
        <div className='modal_image'>
      <img src={selectedConversation?.profilePic} alt="images" />
      </div>
    </div>
  )
}
