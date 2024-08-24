import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Authuser } from "../../Context/AuthContext";

export default function useLogout() {
    const [loading, setloading] = useState(false);
    const navigate  = useNavigate();
    const { setAuthUser } = Authuser(); 
    const logout = async () => {
        try {
            setloading(true);
            const response = await fetch(`/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = await response.json();
            if (result) {
                localStorage.removeItem("chat-user");
                setAuthUser(null);
                setloading(false);
            }
        } catch (err) {
            toast.error(err.message);
            setloading(false);
        }
    }
    return { loading, logout }
}