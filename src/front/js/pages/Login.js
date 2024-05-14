import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const loginUser = async () => {
    const response = await fetch(
      "https://orange-meme-jjjvx4pgr56wf7qq-3001.app.github.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();
    localStorage.setItem("token", data.token);
    if (response.ok) {
      actions.settingLogIn()
      navigate("/private");
    } else {
      console.log("Error:", data);
    }
  };



  return (

    <div className="container text-center mt-5">
      <h1>Login page</h1>
      <form
        onSubmit={(e) => {
          if (email != "" && password != "") {
            e.preventDefault();
            loginUser();
          } else alert("Fields cannot be empty");
        }}
      >
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button className="btn btn-success mt-4">Login</button>
        <Link to="/signup">
          <button className="btn btn-info mx-3 mt-4">register</button>
        </Link>
      </form>

    </div>
  );
};