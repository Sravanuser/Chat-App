import React, { useState, useEffect } from 'react'
import "./Conversation.css"
import MessageBar from "./MessageBar"
import useConversation from "../../Zustand/Zustand"
import Modal from '../Conversation/Modal'
import MessageBox from "./MessageBox";
import Messages from "./Messages";

export default function Conversation() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className='conversation'>
      {
        selectedConversation != null ?
          <>
            <div className='wrap'>
              <MessageBar setShow={setShow} />
              <Messages />
            </div>
            <MessageBox />
          </> : <ChatMessage />
      }
      {show && <Modal setShow={setShow} />}
    </div>
  )
}

export function ChatMessage() {
  return (
    <div className="chats">
      <p>Hi</p>
      <p>Select user to chat</p>
    </div>
  )
}