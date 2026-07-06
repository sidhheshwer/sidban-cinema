import React, { useContext, useEffect, useRef, useState } from "react";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import SidbanMovieLoader from "./SidbanMovieLoader";
import "../stylesheets/home.css";
import { IoPlayCircle } from "react-icons/io5";
import {  useNavigate } from "react-router-dom";
import { MdStarRate } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import Categories from "./Categories";
import { HiCalendarDateRange } from "react-icons/hi2";
import SidbanFooter from "./SidbanFooter";
import { FaListAlt } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import SidbanPiracyAlert from "./SidbanPiracyAlert";


export default function Home() {
  const { movies, loading, getSidbanMoviesData, setSidbanError, setSeeOverview,sidbanError,setOpenSidbanAI,handleOnSidbanAI,postSidbanHistory,checkAuth,setShowPiracy} = useContext(SidbanMoviesContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  const sidbanSliderRef = useRef([]);

  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    53: "Thriller",
    10752: "War",
    37: "Western",

    
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics"
  };



  const popularMovies = movies?.results || [];


useEffect(() => {
  async function checkUser() {
    const status = await checkAuth();

    if ([401].includes(status)) {
  
      navigate("/login");
    }
  }

  checkUser();
}, [navigate, checkAuth]);


    useEffect(() => {
  const sidbanAlert = localStorage.getItem("sidbanAlert");

  if (sidbanAlert === "accepted") {
    setShowPiracy(false);
  } else {
    setShowPiracy(true);
  }
}, [setShowPiracy]);



  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let retries = 5;

      while (retries > 0) {
        try {
          await getSidbanMoviesData();
          return;
        } catch (error) {
          retries--;


                      if (retries === 0) {
                           setSidbanError(true);
                               return;
                             }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);




  useEffect(() => {
    if (popularMovies.length === 0) return;

    const currentInterval = setInterval(() => {
      setCurrentImage(
        (prev) => prev === popularMovies.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(currentInterval);
  }, [popularMovies.length]);

  useEffect(() => {
    const currentElement = sidbanSliderRef.current?.[currentImage];
    const container = currentElement?.parentElement;

    if (currentElement && container) {

      const elementOffsetLeft = currentElement.offsetLeft;
      const elementWidth = currentElement.clientWidth;
      const containerWidth = container.clientWidth;

      const targetScrollLeft = elementOffsetLeft - (containerWidth / 2) + (elementWidth / 2);


      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
  }, [currentImage]);










  function handleOnPlayMovie(movie) {
    postSidbanHistory(movie)
    navigate(`/sidban-player/${movie.title}/${movie.id}`);
  }

  

  function handleOnSeeMoreDetails(movies) {

    localStorage.setItem(
      "sidbanOverview",
      JSON.stringify(movies)
    );
    setSeeOverview(movies);
     navigate(`/overview/${movies.title || movies.name}/${movies.media_type || "movie"}`, {
    state: movies
  });
  }

     if(sidbanError){
 
  navigate("/error")
 }

async function handleOnSendMovie(data){
   setOpenSidbanAI(true);
   await handleOnSidbanAI(data);
 }

  return (
    <>
      {loading || showLoader ? (
        <SidbanMovieLoader loading={loading} />
      ) : (
        <>
          <div className="homeDiv" >

            {popularMovies.map((sidbanMovie, index) => (

              <div className="homeCard" ref={(el) => sidbanSliderRef.current[index] = el} key={sidbanMovie.id} style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.3), rgba(0,0,0,0.95)),url(https://image.tmdb.org/t/p/original${sidbanMovie.backdrop_path})` }} >
                <div className="seeMoreDetails" onClick={() => { handleOnSeeMoreDetails(sidbanMovie) }}>&nbsp; &nbsp;<FaListAlt className="seeIcon" /></div>
                <div className="homeDetails">
                  <h1 className="mainTitle">
                    {sidbanMovie.title}
                  </h1>

                  <div className="movieMeta">
                    <p className="catvotes"><MdStarRate className="starIcon" />&nbsp;{sidbanMovie.vote_average}</p>
                    <p className="catvotes"><BiSolidLike className="likeIcon" />&nbsp;{sidbanMovie.vote_count} votes</p>
                    <p className="catvotes"><HiCalendarDateRange className="dateIcon" />&nbsp;{sidbanMovie.release_date}</p>
                  </div>

                  <p className="genres">{sidbanMovie.genre_ids?.map((id) => genres[id]).filter(Boolean).join(" • ")} </p>

                  <p className="overview"> {sidbanMovie.overview?.slice(0,150) || "Overview not available yet."}...</p>

                  <div className="seeMoreDiv">
                    <IoPlayCircle className="playButton" onClick={() => handleOnPlayMovie(sidbanMovie)} />
                    <div className="sidbanAIDiv">
                      <p onClick={()=>{handleOnSendMovie(sidbanMovie)}}>Ask Sid<span className="banText">ban</span>AI</p><GiBrain className="sidbanAIIcon"/><br/>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Categories allGeners={genres} allMovies={popularMovies} />
          
          <SidbanPiracyAlert/>
          <SidbanFooter />
        </>

      )}
    </>
  );
}