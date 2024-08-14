import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }


  function handleUsername(event) {
    setUsername(event.target.value);
  }
  async function handleLogin() {
    try {
      let res = await fetch("https://solace-round-1.onrender.com/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({username,  email, password }),
        }
      );
      let res2 = await res.json();
      if (res2.message == "user registered successfully") {
        console.log("register it")
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <>
  
  <p>Signup</p>

  <input type="text" placeholder="enter username" value={username} onChange={handleUsername} />
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
  
  </>
}

export default Signup