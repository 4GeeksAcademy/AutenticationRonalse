import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [ email, setEmail ] = useState("")
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  setEmail= store.setEmail,
  
  useEffect(() => {

    actions.gettingInfo()
		
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