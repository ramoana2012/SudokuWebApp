import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./base";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        console.log(error)
      );
      navigate("/");
    }
    onRegister();
  };

  return (
    <div className="screen">
      <div className="border">
      <div className="content">
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <span/>
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="buttons">Login</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Login;