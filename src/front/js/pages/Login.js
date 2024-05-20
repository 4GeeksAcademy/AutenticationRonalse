import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const success =  actions.loginUser(email, password);
      if (success) {
        navigate("/private");
      } else {
        alert("Unexpected Error");
      }
    } else {
      alert("Fields cannot be empty");
    }
  };

  return (

    <div className="container text-center mt-5">
      <h1>Login page</h1>
      <form
        onSubmit={e => handleSubmit(e)}
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
        <input type="submit" value={"Login"} className="btn btn-success mt-4"></input>
        <Link to="/signup">
          <button className="btn btn-info mx-3 mt-4">register</button>
        </Link>
      </form>

    </div>
  );
};