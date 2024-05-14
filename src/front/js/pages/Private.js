import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [ email, setEmail ] = useState("")
  
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
  useEffect(() => {

    const gettingInfo = async () => {

      const response = await fetch(
        "https://orange-meme-jjjvx4pgr56wf7qq-3001.app.github.dev/private",
        {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        }
      );
  
      const data = await response.json();
      setStore({ setEmail: [...getStore().setEmail, data.email] });
      console.log(data.email, "This is the email of the user")
      }
      gettingInfo()
	  }, [])

  return (
    <div className="text-center mt-5">
      {token ? (
        <div>
          <h1>U are now on private {email} </h1>
          <div></div>
        </div>
      ) : (
        navigate("/")
      )}
    </div>
  );
};