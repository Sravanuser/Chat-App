import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../Hooks/AuthHooks/useLogin";

export default function Login() {
    const [InputValue, setInputValue] = useState({
        email: "", password: ""
    })
    const { loading, login } = useLogin();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValue(() => {
            return {
                ...InputValue,
                [name]: value
            }
        })
    }
    async function submitData(event) {
        event.preventDefault();
        await login(InputValue);
    }
    return (
        <div className="login">
            <form onSubmit={submitData}>
                <h1 className="log">Login</h1>
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" value={InputValue.email} onChange={handleChange} />
                <label htmlFor="Password">Password</label>
                <input type="password" name="password" value={InputValue.password} onChange={handleChange} />
                <button type="submit">Log in</button>
                <p className="link">Don't have an account ? <Link to="/sign">Register</Link></p>
            </form>
        </div>
    )
}