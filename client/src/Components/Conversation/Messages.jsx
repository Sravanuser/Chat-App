import React from 'react'
import Message from './Message'
import { useEffect, useRef } from 'react';
import useListenMessage from '../../Hooks/MessageHooks/useListenMessage';
import useGetMessages from '../../Hooks/MessageHooks/useGetMessages'

export default function Messages() {
    useListenMessage();
    const lastMessageRef = useRef();
    const { loading, messages } = useGetMessages();
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages])
    console.log("messaages",messages)
    return (
        <div className='messages'>
            {
                
                !messages ? null : messages.map((item, idx) => {
                    return (
                        <div key={idx} ref={lastMessageRef}>
                            <Message key={idx} item={item} />
                        </div>
                    )
                })
            }
        </div>
    )
}
