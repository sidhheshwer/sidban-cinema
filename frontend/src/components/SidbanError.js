import React, { useContext } from "react";
import "../stylesheets/error.css";
import { useNavigate } from "react-router-dom";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import SidbanFooter from "./SidbanFooter";



export default function SidbanError() {
  const {setSidbanError,getSidbanMoviesData,errorMessage}=useContext(SidbanMoviesContext);

   const redirect=useNavigate();
  
 console.log(errorMessage)
 async function handleOnHome() {
  setSidbanError(false);

  try {
    await getSidbanMoviesData();
    redirect("/home");
  } catch (error) {
    setSidbanError(true);
  }
}
  return (
    <>
    <div className="errorContainer">
      <div className="errorCard">
        <h1 className="errorHead">
          Sid<span className="banText">ban</span>Cinema
        </h1>
    
        <h2 className="errorCode">Error</h2>
       

        <h3 className="errorSub">{!errorMessage?"Something Went Wrong!":errorMessage}</h3>

        <p className="errorMessage">
          We couldn't load the movies right now. Please try again in a few moments.
        </p>

        <button
          className="errorBtn"
          onClick={handleOnHome}
        >
          Try Again
        </button>
      </div>
    
    </div>
       <SidbanFooter/>

       </>
   
  );
}