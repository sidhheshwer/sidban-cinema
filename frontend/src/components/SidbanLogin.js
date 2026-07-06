import React, { useContext, useEffect, useState } from 'react'
import "../stylesheets/sidbanSignin.css";
import { GiBrain, GiFilmSpool } from "react-icons/gi";
import { SidbanMoviesContext } from '../context/SidbanMoviesContext';
import { useNavigate } from 'react-router-dom';

export default function SidbanLogin() {
    const {postLoginData,checkAuth}=useContext(SidbanMoviesContext);
    const [loginData,setLoginData]=useState({email:"",password:""});
    const redirect=useNavigate();

useEffect(() => {
  async function checkUser() {
    const status = await checkAuth();

    if (status === 200) {
      redirect("/home");
    }
  }

  checkUser();
}, [checkAuth,redirect]);

  async function handleOnLogin(e) {
  e.preventDefault();

  const status = await postLoginData(loginData);

  if (status === 400 || status === 401 || status === 404) {
    redirect("/login");
  } else if (status === 500 || status === 503 || status === 502) {
    redirect("/error");
  } else if (status === 200) {
    
    redirect("/home");
  }
}


  return (
    <div className='sidbanSignMain'style={{ backgroundImage: ` linear-gradient(to right, rgba(0, 0, 0, 0.21),rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.71) ), url('/sidbanCinemaAuthBack1.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className='sidbanSignDiv'>
         <div className='sidbanSignHead'>
             <p>Sid<span className='banText'>ban</span>Cinema</p>
             <GiFilmSpool className='sidbanSignIcon'/>
         </div>
        <form onSubmit={(e)=>{handleOnLogin(e)}} className='sidbanSignForm'>
        <input className='sidbanInput' type='text' name='email' value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})} placeholder='sidban@gmail.com' required/>
        

        <input className='sidbanInput' type='password' name="password" value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})} placeholder='enter password' required/>
      
           <div className='alreadyDiv'>
          <p className='alText1'>create an account? </p>&nbsp;&nbsp;<p className='alText2' onClick={()=>{redirect("/")}}>signin</p>
         </div>
         <button type="submit" className='sidbanSignBtn'>Login</button>
           </form>

            <div className='signFooter'>
                         <p className='signSidbanAI'>Powered by Sid<span className='banText'>ban</span>AI</p><GiBrain className='signSidbanAIIcon'/>
                   </div>
        </div>
    </div>
  )
}
