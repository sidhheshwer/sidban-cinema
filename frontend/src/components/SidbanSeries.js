
import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/categorypage.css";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { IoMdPlayCircle } from "react-icons/io";
import { MdOutlineReadMore, MdStarRate, MdHome } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import SidbanMovieLoader from "./SidbanMovieLoader";
import { IoMdArrowRoundBack } from "react-icons/io";
import SidbanFooter from "./SidbanFooter";
import { GiBrain } from "react-icons/gi";

export default function SidbanSeries() {
  const [openDesp, setOpenDesp] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
 
  const redirect = useNavigate();
  const  genreName  = "Series";

 

  const { generNames, sidbanError ,baseUrl,setOpenSidbanAI,handleOnSidbanAI,postSidbanHistory} =useContext(SidbanMoviesContext);

 
  const [allSeries, setAllSeries] = useState([]);


 



 



    useEffect(() => {
  const timer = setTimeout(() => {
    setShowLoader(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

 
  useEffect(() => {
    if (sidbanError) {
      redirect("/error");
    }
  }, [sidbanError, redirect]);

 useEffect(() => {
  const loadMoreMovies = async () => {
    let retries = 5;

    while (retries > 0) {
      try {
        const response = await axios.get(
          `${baseUrl}/sidban-cinema/series?page`
        );

        setAllSeries(response.data.results);
        return; 
      } catch (error) {
        retries--;

        if (retries === 0) {
          console.log(error);
          redirect("/error");
        }

        await new Promise(resolve =>
          setTimeout(resolve, 1000)
        );
      }
    }
  };

  loadMoreMovies();
}, [generNames, redirect, baseUrl]);

  
     

  function handleOnDesp(id) {
    setOpenDesp(openDesp === id ? null : id);
  }

  function handleOnHome() {
    redirect("/home");
  }
  


   function handleOnPlaySeries(e, movie) {
    e.preventDefault();
  

    postSidbanHistory(movie)
    redirect(`/sidban-player/series/${movie.name}/${movie.id}`);
  }


     async function handleOnSendMovie(data){
   setOpenSidbanAI(true);
     const seriesData = {
    ...data,
    media_type: "tv"
  };
 

   await handleOnSidbanAI(seriesData);
 }


  return (
    <>

      <div className="genHeadDiv">
        <div className="genLine"></div>

        <div className="genBtnDiv" onClick={handleOnHome}>
          <h2 className="genHead">Tv shows</h2>

          <p className="genbackHome">
            <IoMdArrowRoundBack className="genArrow" />
            <MdHome className="homeLogo" />
          </p>
        </div>
      </div>

{showLoader? <SidbanMovieLoader/>  :
      <div className="genereContainer">
        {allSeries.map((movie) => (
          <div
            className="genDiv"
            key={movie.id}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), transparent), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="genDetails">
              <h3 className="genMovieHead">
                {movie.title || movie.name}
              </h3>
               <div className="sidbanGeners">
                               <p className="genres">{genreName} </p>
                                 <div className="sidbanAIDiv2">
                             <p onClick={()=>{handleOnSendMovie(movie)}}>Ask Sid<span className="banText">ban</span>AI</p><GiBrain className="sidbanAIIcon"/><br/>
                                     </div>
                               </div>

              <div className="genVoteDiv">
                <p className="genvotes">
                  <MdStarRate className="starIcon" />
                  &nbsp;{movie.vote_average}
                </p>

                <p className="genvotes">
                  <BiSolidLike className="likeIcon" />
                  &nbsp;{movie.vote_count} votes
                </p>

                <p className="genvotes">
                  <HiCalendarDateRange className="dateIcon" />
                  &nbsp;{movie.release_date || movie.first_air_date}
                </p>
              </div>

              <div className="playReadDiv">
                <IoMdPlayCircle onClick={(e) =>  handleOnPlaySeries( e,movie)}/>

                <MdOutlineReadMore
                  className="readMoreIcon"
                  onClick={() => handleOnDesp(movie.id)}
                />
              </div>

              <p
                className={
                  openDesp === movie.id
                    ? "openDiv"
                    : "closeDiv"
                }
              >
                {movie.overview || "Overview not available yet."}
              </p>
            </div>
          </div>
        ))}
      </div>}
      <SidbanFooter/>


    </>
  );
}