import { createContext, useEffect, useState } from "react";
import { useContext } from "react"
import io from "socket.io-client"
import { Authuser } from "./AuthContext.jsx";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export default function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authuser } = Authuser();
    useEffect(() => {
        if (authuser) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authuser._id,
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(onlineUsers)
            })
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authuser])
    return (
        <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>
    )
}