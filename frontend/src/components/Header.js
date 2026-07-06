import React, { useContext } from 'react'
import "../stylesheets/sidbanHeader.css";
import { SidbanMoviesContext } from '../context/SidbanMoviesContext';
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { GiFilmSpool } from "react-icons/gi";


export default function Header() {
  const {showNav,setShowNav,setOpenSearch,getSidbanHistory,currentLoginUser} =useContext(SidbanMoviesContext);
  const redirect=useNavigate();

    const storedUser = localStorage.getItem("sidbanUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  function handleOnNavbar(e){
    e.preventDefault();

    setShowNav(true);
    
  }

  function handleOnSidbanSearch(){
     setOpenSearch(true);

  }
  
  function handleOnHome(){
    redirect("/home")
  }

  async  function handleOnHistory(){

     await getSidbanHistory();
    redirect(`/history/${currentLoginUser}`);
  }



  return (
    <div className='sidbanMovieHeader'>
       <div className='headDiv'>
         <h2 onClick={handleOnHome} style={{cursor:'pointer'}}>Sid<span className='banText'>ban</span>Cinema </h2><GiFilmSpool style={{color:"red",fontSize:"1.5rem"}}/>
       </div>
 

      <div className='searchDiv'>
        <IoSearchSharp className='searchIcon' onClick={handleOnSidbanSearch}/>
         <img className='userHeadProfilePic' src={currentUser?.profile_pic} alt="profile_picture" onClick={()=>{handleOnHistory()}} />
       {!showNav && <div className='sidbanHamburg' onClick={(e)=>{handleOnNavbar(e)}}>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
        </div>
        }
        </div>
    
  </div>
  )
}
