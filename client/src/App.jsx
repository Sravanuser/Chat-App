import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import Home from './Home.jsx';
import Login from './Auth/Login.jsx';
import Register from "./Auth/Register.jsx";
import { Authuser } from "./Context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function App() {
  const { authuser } = Authuser();
  return (
    <>
      <Routes>
        <Route path="/" element={authuser ? <Home /> : <Navigate to={"/sign"} />} />
        <Route path="/sign" element={authuser ? <Navigate to={"/"} /> : <Register/>} />
        <Route path="/login" element={authuser ? <Navigate to={"/"} /> : <Login />} />
      </Routes>
      <Toaster position="top-center" />
    </>
  )
}