import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSignup(){
    navigate("/signup")
  }

  async function handleLogin() {
    try {
      let res = await fetch("https://solace-round-1.onrender.com/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  email, password }),
        }
      );
      let res2 = await res.json();
// console.log(res2)
      if (res2.message == "user login successfully") {
        console.log("got it")
        localStorage.setItem("token", JSON.stringify(res2.token));

        navigate("/todo")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <p>Login</p>
      <input
        type="email"
        placeholder="enter email"
        value={email}
        onChange={handleEmail}
      />
      <input
        type="password"
        placeholder="enter password"
        value={password}
        onChange={handlePassword}
      />
      <button onClick={handleLogin}>Submit</button>
      <button onClick={handleSignup}>Signup</button>
    </>
  );
};

export default Login;
