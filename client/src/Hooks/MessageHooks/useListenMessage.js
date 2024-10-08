import React, { useEffect } from 'react'
import { useSocketContext } from '../../Context/SocketContext'
import useConversation from '../../Zustand/Zustand'

export default function useListenMessage() {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage");
    }, [socket, messages, setMessages])
}
