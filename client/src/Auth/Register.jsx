import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../Hooks/AuthHooks/useSignup";

export default function Login() {
    const [InputValue, setInputValue] = useState({
        username: "", email: "", password: "", gender: "", profilePic: ""
    })
    const { loading, signup } = useSignup();
    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "profilePic" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputValue((prevState) => ({
                    ...prevState,
                    profilePic: reader.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setInputValue((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    }
    async function submitData(event) {
        event.preventDefault();
        signup(InputValue);
    }
    return (
        <div className="login">
            <form className="sign" onSubmit={submitData}>
                <h1 className="log">Register</h1>
                <label htmlFor="Username">Username</label>
                <input type="text" name="username" value={InputValue.username} onChange={handleChange} />
                <label htmlFor="Email">Email</label>
                <input type="email" name="email" value={InputValue.email} onChange={handleChange} />
                <label htmlFor="Password">Password</label>
                <input type="password" name="password" value={InputValue.password} onChange={handleChange} />
                <div className="checkbox">
                    <label className="checks">
                        <input type="radio" name="gender" value="male" onChange={handleChange} />
                        male
                    </label>
                    <label className="checks">
                        <input type="radio" name="gender" value="female" onChange={handleChange} />
                        female
                    </label>
                </div>
                <input type="file" name="profilePic" onChange={handleChange} />
                <button type="submit">Sign up</button>
                <p className="link">Already have an account ? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}