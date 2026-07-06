


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
import { FaListAlt } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

export default function SidbanMovies() {
  const [openDesp, setOpenDesp] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
 
  const redirect = useNavigate();
  const  genreName  = "Movie";

 

  const { generNames, sidbanError ,baseUrl,setSeeOverview,setOpenSidbanAI,handleOnSidbanAI,postSidbanHistory} = useContext(SidbanMoviesContext);

 
  const [allTop, setAllTop] = useState([]);

 








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
      try {
       

        const response = await axios.get(
          `${baseUrl}/sidban-cinema/top-imdb?page`
        );

        

        setAllTop(response.data.results)
      } catch (error) {
        redirect("/error")
        console.log(error);
      } 
    };

    loadMoreMovies();
  }, [ generNames,redirect,baseUrl]);


  


  function handleOnDesp(id) {
    setOpenDesp(openDesp === id ? null : id);
  }

  function handleOnHome() {
    redirect("/home");
  }
  


    function handleOnPlayMovie(e, movie) {
    e.preventDefault();
    postSidbanHistory(movie)
    redirect(`/sidban-player/${movie.title}/${movie.id}`);
  }


    function handleOnSeeMoreDetails(movies){

  localStorage.setItem(
    "sidbanOverview",
    JSON.stringify(movies)
  );
    setSeeOverview(movies);
     
   redirect(`/overview/${movies.title || movies.name}/${movies.media_type || "movie"}`, {
    state: movies
  });
  }


    async function handleOnSendMovie(data){
   setOpenSidbanAI(true);
   await handleOnSidbanAI(data);
 }
  return (
    <>

      <div className="genHeadDiv">
        <div className="genLine"></div>

        <div className="genBtnDiv" onClick={handleOnHome}>
          <h2 className="genHead">Top IMDB</h2>

          <p className="genbackHome">
            <IoMdArrowRoundBack className="genArrow" />
            <MdHome className="homeLogo" />
          </p>
        </div>
      </div>

{showLoader? <SidbanMovieLoader/>  :
      <div className="genereContainer">
        {allTop.map((movie) => (
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

          <div className="playReadDivMain">
                                          <div className="playReadDiv">
                                            <IoMdPlayCircle onClick={(e) =>  handleOnPlayMovie( e, movie)}/>
                                             <FaListAlt onClick={()=>{handleOnSeeMoreDetails(movie)}} className="seeIcon"/>
                                           
                                          </div>

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