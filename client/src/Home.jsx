import React from "react";
import { Authuser } from "./Context/AuthContext";
import useLogout from "./Hooks/AuthHooks/useLogout";
import Sidebar from "./Components/Sidebar/Sidebar";
import Conversation from "./Components/Conversation/Conversation.jsx";

export default function Home(){     
    return(
        <div className="home">
            <Sidebar/>
            <Conversation/>
        </div>
    )
}
