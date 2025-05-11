"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useAuth } from "../helpers/AuthContextProvider";
import "./customstyle.css";
import Link from "next/link";

function Login() {
  //let navigate = useNavigate();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authState, setAuthState } = useAuth();

  const onSubmit = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        setPassword("");
        setUsername("");
      }
      //adding a token in the session storage
      else {
        localStorage.setItem("accessToken", response.data.accessToken);
        setAuthState({username:username,id:response.data.id,status:true,loading:false});
        router.push(`/`);
      }
    });
  };

  return (
    <div className="login-wrapper">
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <input
        className="login-input"
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button className="login-button" onClick={onSubmit}>
        Login
      </button>
      <p className="login-footer">
        Don't have an account?{" "}
        <Link href="/registration" className="login-link">
          Register
        </Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
