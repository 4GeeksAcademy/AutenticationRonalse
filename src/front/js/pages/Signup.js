import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log("Password", password, "Email:", email);

const handleSumbit = (e) =>{
  if (email != "" && password != "") {
    e.preventDefault();
    actions.registerUser(email, password) ? navigate("/login") : alert("Unexpected Error");
  } else (alert("Fields cannot be empty"))   
  };

  return (
    <div className=" container text-center mt-5">
      <h1>Fill out with your information to REGISTER onto our page</h1>
      <form
        onSubmit={handleSumbit}
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
          <label htmlFor="floatingInput">Email address</label>
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
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <input type="submit" value={"register"} className="btn btn-success mt-4"></input>
        <Link to="/login">
        <button className="btn btn-info mx-3 mt-4">login</button>
        </Link>
      </form>
    </div>
  );
};