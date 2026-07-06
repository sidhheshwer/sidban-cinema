import React, { useContext, useEffect, useState } from 'react'
import "../stylesheets/sidbanSignin.css";
import { GiBrain, GiFilmSpool } from "react-icons/gi";
import { SidbanMoviesContext } from '../context/SidbanMoviesContext';
import { useNavigate } from 'react-router-dom';

export default function SidbanSign() {
    const {postSigninData,checkAuth}=useContext(SidbanMoviesContext);
    const [signinData,setSigninData]=useState({email:"",password:"",username:"",profile_pic:""});
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


  async function handleOnSignin(e) {
  e.preventDefault();

  const status = await postSigninData(signinData);

  if (status === 400 || status === 401 || status === 404) {
    redirect("/");
  } else if (status === 500 || status === 503 || status === 502) {
    redirect("/error");
  } else if (status === 200) {

    redirect("/home");
  }
}



  return (
    <div className='sidbanSignMain' style={{ backgroundImage: ` url('/sidbanCinemaAuthBack1.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className='sidbanSignDiv'>

        
         <div className='sidbanSignHead'>
             <p>Sid<span className='banText'>ban</span>Cinema</p>
             <GiFilmSpool className='sidbanSignIcon'/>
           
         </div>
   
       
        <form onSubmit={(e)=>{handleOnSignin(e)}} className='sidbanSignForm'>
        <input className='sidbanInput' type='text' name='email' value={signinData.email} onChange={(e)=>setSigninData({...signinData,email:e.target.value})} placeholder='sidban@gmail.com' required/>
         <input className='sidbanInput' type='text' name='username' value={signinData.username} onChange={(e)=>setSigninData({...signinData,username:e.target.value})} placeholder='enter username' required/>

        <input className='sidbanInput' type='password' name="password"  value={signinData.password} onChange={(e)=>setSigninData({...signinData,password:e.target.value})} placeholder='enter password' required/>
        <div className='profilePicDiv'>
       <label className="fileUploadLabel"> Upload Profile Pic <input type="file" name="profile_pic" hidden onChange={(e) => setSigninData({ ...signinData, profile_pic: e.target.files[0] }) } /> </label>
        <p className='fileName'> {signinData.profile_pic ? signinData.profile_pic.name.length > 10 ? signinData.profile_pic.name.slice(0, 15) + "..." : signinData.profile_pic.name : "No file selected"} </p>
         </div>
         <div className='alreadyDiv'>
          <p className='alText1'>Already have an account? </p>&nbsp;&nbsp;<p className='alText2' onClick={()=>{redirect("/login")}}>login</p>
         </div>
         <button type="submit" className='sidbanSignBtn'>Signin</button>
           </form>
             <div className='signFooter'>
              <p className='signSidbanAI'>Powered by Sid<span className='banText'>ban</span>AI</p><GiBrain className='signSidbanAIIcon'/>
        </div>
        </div>
      
    </div>
  )
}
