import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [ email, setEmail ] = useState("")
  
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const gettingInfo = async () => {
      fetch(
        "https://orange-meme-jjjvx4pgr56wf7qq-3001.app.github.dev/private",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setEmail(data.email);
          console.log(data.email, "This is the email of the user");
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    if (token) {
      gettingInfo();
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="text-center mt-5">
      {token ? (
        <div>
          <h1>You are now on private {email} </h1>
        </div>
      ) : (
        <div>
          <h1>Redirecting...</h1>
        </div>
      )}
    </div>
  );
};