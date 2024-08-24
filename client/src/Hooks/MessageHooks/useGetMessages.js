import { useEffect, useState } from "react";
import useConversation from "../../Zustand/Zustand";

export default function useGetMessages() {
    const { selectedConversation, messages, setMessages } = useConversation();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getMessages() {
            setLoading(true);
            try {
                const response = await fetch(`/message/${selectedConversation?._id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const result = await response.json();
                setMessages(result.messages);
            } catch (err) {
                toast.error(result.message);
            } finally {
                setLoading(false);
            }
        }
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages])
    return { loading, messages }
}