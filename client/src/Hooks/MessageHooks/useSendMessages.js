import React, { useEffect, useState } from 'react'
import useConversation from '../../Zustand/Zustand';
import toast from "react-hot-toast";

export default function useSendMessages() {
    const [loading, setLoading] = useState(false);
    const { selectedConversation,messages,setMessages } = useConversation();
    async function sendMessage(message) {
        setLoading(true);
        try{
            const response = await fetch(`/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });
            const result = await response.json();
            if(!result){
                throw new Error(result.error);
            }
            setMessages([...messages,result])
        }catch(err){
            toast.error(err.message)
        }finally{
            setLoading(false);
        }
        
    }
    return { loading,sendMessage }
}
