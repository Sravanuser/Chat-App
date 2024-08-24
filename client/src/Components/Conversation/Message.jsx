import React from 'react'
import { Authuser } from "../../Context/AuthContext"
import useConversation from '../../Zustand/Zustand'

export default function Message({ item,ref }) {
    const { authuser } = Authuser();
    const fromMe = item.senderId === authuser._id;    
    return (
        <div style={{ width:"100%", display: "flex", justifyContent: fromMe ? "flex-end" : "flex-start"}}>
            <div className='message' style={{margin:"5px 10px"}}>
                <p>{item.message}</p>
            </div>
        </div>
    )
}
