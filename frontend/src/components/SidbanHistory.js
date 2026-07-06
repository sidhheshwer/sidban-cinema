import React, { useContext,useEffect,useState } from "react";
import "../stylesheets/history.css";
import { MdHome } from "react-icons/md";

import SidbanMovieLoader from "./SidbanMovieLoader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { useNavigate } from "react-router-dom";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoPlayCircle } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { MdLiveTv } from "react-icons/md";
export default function SidbanHistory() {
  const [showLoader, setShowLoader] = useState(true);
  const redirect=useNavigate();


  const {checkAuth,showHistory,deleteSidbanHistory,getSidbanHistory,loading} = useContext(SidbanMoviesContext);






useEffect(() => {
  async function checkUser() {
    const status = await checkAuth();

    if (status === 500) {
      redirect("/error");
      return;
    }

    if (status !== 200) {
      redirect("/login");
    }
  }

  checkUser();
}, [redirect, checkAuth]);

  

    useEffect(() => {
  const timer = setTimeout(() => {
    setShowLoader(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);




  function handleOnHome() {
    redirect("/home");
  }


useEffect(() => {
  async function loadHistory() {
    const sidbanUserData = localStorage.getItem("sidbanUser");

   
    if (!sidbanUserData) return;

    const sidbanUser = JSON.parse(sidbanUserData);
    await getSidbanHistory(sidbanUser.username);
  }

  loadHistory();
}, [getSidbanHistory]);








   function handleOnPlayMovie(movie) {
   if(movie?.type==="movie"){
    redirect(`/sidban-player/${movie.title}/${movie.movie_id}`);
   }
   else{
    redirect(`/sidban-player/series/${movie.title}/${movie.movie_id}`);
   }
  }


 async function handleOnDeleteHistory(id){
   await deleteSidbanHistory(id);
   
  }
  
return (
  <>
    {loading || showLoader ? (
      <SidbanMovieLoader />
    ) : (
      <>
    <div className="genHeadDiv2">
      <div className="genLine2"></div>

      <div className="genBtnDiv2" onClick={handleOnHome}>
      <h2 className="genHead2">Watch History</h2>

        <p className="genbackHome2">
          <IoMdArrowRoundBack className="genArrow2" />
          <MdHome className="homeLogo2" />
        </p>
      </div>
    </div>

    <div className="historyDiv">
      {showHistory?.length > 0 ? (
        showHistory.map((data) => (
          <div
            key={data.id}
            className="historyCard"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.95)), url(https://image.tmdb.org/t/p/original${data.poster})`
            }}
          >
            <div className="historyDetailsDiv">
              <h1 className="hisHead">{data.title}</h1>
              <p className="hisType">{data.type}</p>
              <p className="hisOverview">
                {data.overview?.slice(0, 100)}...
              </p>

              <div className="hisDateDiv">
                <HiCalendarDateRange className="hisDateIcon" />
                <p className="hisDate">{data.release_date}</p>
              </div>

              <div className="hisPlayDiv">
                <IoPlayCircle
                  className="playButton"
                  onClick={() => handleOnPlayMovie(data)}
                />

                <MdDeleteSweep
                  className="deleteBtn"
                  onClick={() => handleOnDeleteHistory(data.id)}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="noHisDiv">
          <p className="noHistoryPara">No watch history found</p>
          <MdLiveTv className="noHisIcon" />
        </div>
      )}
     
    </div>
    
  </>
    )}
  </>
)}