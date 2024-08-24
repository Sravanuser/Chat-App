import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Authuser } from "../../Context/AuthContext";

export default function useLogin() {
    const [loading, setloading] = useState(false);
    const { authuser, setAuthUser } = Authuser();
    const login = async ({ email, password }) => {
        try {
            setloading(true);
            const handle = handleErrors({ email, password });
            if (!handle) {
                return;
            }
            const response = await fetch(`/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
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
    return { loading, login }
}

const handleErrors = ({ email, password }) => {
    if (!email || !password) {
        toast.error("Enter all details");
        return false;
    } else {
        return true;
    }
}