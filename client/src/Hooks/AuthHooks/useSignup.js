import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Authuser } from "../../Context/AuthContext";

export default function useSignup() {
    const [loading, setloading] = useState(false);
    const { authuser, setAuthUser } = Authuser();
    const signup = async ({ username, email, password, gender, profilePic }) => {
        try {
            setloading(true);
            const handle = handleErrors({ username, email, password, gender });
            if (!handle) {
                return;
            }
            const response = await fetch("http://localhost:5000/auth/sign", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password, gender, profilePic })
            });
            const result = await response.json();
            if (!result.error) {
                toast.success(result.message);
                localStorage.setItem("chat-user", JSON.stringify(result));
                setAuthUser(result);
                setloading(false);
            } else {
                throw new Error(result.error)
            }
        } catch (err) {
            toast.error(err.message);
            setloading(false);
        }
    }
    return { loading, signup }
}

const handleErrors = ({ username, email, password, gender }) => {
    if (!username || !email || !password || !gender) {
        toast.error("Enter all details");
        return false;
    } else {
        return true;
    }
}