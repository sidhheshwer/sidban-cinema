import React, { useContext } from 'react';
import "../stylesheets/navbar.css";
import { IoClose } from "react-icons/io5";
import { SidbanMoviesContext } from '../context/SidbanMoviesContext';
import { useNavigate } from 'react-router-dom';
import { GiFilmSpool } from "react-icons/gi";
import { BiSolidLogOut } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
export default function Navbar() {
  const { showNav, setShowNav, getSidbanLogout,setShowHistory,setCurrentLoginUser,setAiResponse,currentLoginUser,getSidbanHistory} = useContext(SidbanMoviesContext);
  const redirect = useNavigate();

  const storedUser = localStorage.getItem("sidbanUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  if (!currentUser) return null;

  function handleOnCloseNav() {
    setShowNav(false);
  }

  function handleOnTrend() {
    setShowNav(false);
    redirect("/trending");
  }

  function handleOnTopIMDB() {
    setShowNav(false);
    redirect("/top-imdb");
  }

  function handleOnMovies() {
    setShowNav(false);
    redirect("/movies");
  }

  function handleOnSeries() {
    setShowNav(false);
    redirect("/series");
  }

  function handleOnAbout() {
    setShowNav(false);
    redirect("/about");
  }

  async function handleOnLogout() {
    await getSidbanLogout();
     localStorage.removeItem("sidbanOverview");
    localStorage.removeItem("sidbanUser");
     localStorage.removeItem("sidbanAlert");
      localStorage.removeItem("sidbanCategoryMovies");
    setShowNav(false);
     setShowHistory([]);
    setCurrentLoginUser(null)
   setAiResponse("");

    redirect("/login");
  }

    async  function handleOnHistory(){

     await getSidbanHistory();
       setShowNav(false);
    redirect(`/history/${currentLoginUser}`);
  }
  return (
    <>
      <div className={`navDiv ${showNav ? "navOpen" : "navClosed"}`}>
        <div className='navHeader'>
          <h2>
            Sid<span className='banText'>ban</span>Cinema
          </h2>
          <GiFilmSpool style={{ color: "red", fontSize: "2rem" }} />
          <IoClose className='closeNav' onClick={handleOnCloseNav} />
        </div>

        <div
          className='userDetailsDiv'
          style={{
            backgroundImage: `linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7),rgba(39, 36, 36, 0.45)), url(${currentUser?.profile_pic})`, backdropFilter: "blur(2px)",  WebkitBackdropFilter: "blur(2px)"}} >
          <img className='userProfilePic' src={currentUser?.profile_pic} alt="profile_picture" />

          <div className='userLogDiv'>
            <div className='userGreetDiv'>
              <p className='userGreet'>Welcome,</p>

              <div className='userNameDiv'>
                <FaUserAlt className='userIcon' />
                <p className='userUsername'>
                  {currentUser?.username?.length > 10 ? currentUser.username.slice(0, 10) + "...": currentUser?.username}
                </p>
              </div>
            </div>
             <div className='logNavDiv'>


              <div className='navHisDiv'>
                <FaHistory className='hisIcon'/>&nbsp;
              <div className='navHistoryBtn' onClick={handleOnHistory}>history</div>
              </div>


            <div className='logBtnDiv'>
              <BiSolidLogOut className='logoutIcon' />
              <div className='userLogBtn' onClick={handleOnLogout}>
                Logout
              </div>
              </div>
            </div>
          </div>
        </div>

        <div className='navButtonDiv'>
          <div className='navBtn' onClick={handleOnTrend}>Trending</div>
          <div className='navBtn' onClick={handleOnMovies}>Movies</div>
          <div className='navBtn' onClick={handleOnSeries}>Tv Shows</div>
          <div className='navBtn' onClick={handleOnTopIMDB}>Top IMDB</div>
          <div className='navBtn' onClick={handleOnAbout}>About Sid<span className='banText'>ban</span>Cinema</div>
        </div>
      </div>
    </>
  );
}