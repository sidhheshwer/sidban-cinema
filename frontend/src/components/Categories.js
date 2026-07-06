import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/categories.css";
import { MdOutlineReadMore } from "react-icons/md";
import { MdStarRate } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoMdPlayCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { FaListAlt } from "react-icons/fa";

import axios from "axios";
import { GiBrain } from "react-icons/gi";


export default function Categories({ allGeners, allMovies }) {
  const [openDesp, setOpenDesp] = useState(false);
  const { setGenereNames,setSeeOverview,baseUrl,setOpenSidbanAI,handleOnSidbanAI,postSidbanHistory} = useContext(SidbanMoviesContext);
  const [categoryMovies, setCategoryMovies] = useState([]);
  const redirect = useNavigate();

  useEffect(() => {
    const getPage2Movies = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/sidban-cinema/category?page=2`
        );

        setCategoryMovies(response.data.results || []);
      } catch (error) {
        console.log(error);
      }
    };

    getPage2Movies();
  }, [baseUrl]);

  function handleOnDesp(id) {
    setOpenDesp(openDesp === id ? null : id);
  }


  function handleOnPlayMovie(e, movie) {
    e.preventDefault();
    postSidbanHistory(movie)
    redirect(`/sidban-player/${movie.title}/${movie.id}`);
  }


  function handleOnViewAll(genreName, genreId) {
    setGenereNames(genreId);
    redirect(`/category/${genreName}`);
  }
  const usedMovieIds = new Set();
  return (
    <div className="categoryDiv">
      

{
  
  Object.entries(allGeners).map(([genreId, genreName]) => {

    const genreMovies = categoryMovies
      .filter(movie =>
        movie.genre_ids.includes(Number(genreId)) &&
        !usedMovieIds.has(movie.id)
      )
      .slice(0, 8);

    genreMovies.forEach(movie =>
      usedMovieIds.add(movie.id)
    );

    if (genreMovies.length === 0) return null;

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
          <div key={genreId} className="category">
            
            <div className="catHeadDiv">
              <div className="catLine"></div>
              <h2 className="catHead">{genreName}</h2>
              <p className="viewCat" onClick={() => { handleOnViewAll(genreName, genreId) }}>Watch More </p>
            </div>

            <div className="catMoviesDiv">
              {genreMovies.map((movie, index) => (
                <div className="mainMoviesDiv" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), transparent),url(https://image.tmdb.org/t/p/original${movie.backdrop_path}) ` }} key={movie.id}>
                     
                  
                  <div className="catMovieDetails">
                   
                    <h3 className="catMovieHead">{movie.title || movie.name}</h3>
                    <div className="sidbanGeners">
                     <p className="genres">{genreName} </p>
                          <div className="sidbanAIDiv2">
                          <p onClick={()=>{handleOnSendMovie(movie)}}>Ask Sid<span className="banText">ban</span>AI</p><GiBrain className="sidbanAIIcon"/><br/>
                          </div>
                     </div>
                    <div className="catVoteDiv">
                      <p className="catvotes"><MdStarRate className="starIcon" />&nbsp;{movie.vote_average}</p>
                      <p className="catvotes"><BiSolidLike className="likeIcon" />&nbsp;{movie.vote_count} votes</p>
                      <p className="catvotes"><HiCalendarDateRange className="dateIcon" />&nbsp;{movie.release_date}</p>
                    </div>
                   <div className="playReadDivMain">
                    <div className="playReadDiv">
                      <IoMdPlayCircle onClick={(e) =>  handleOnPlayMovie( e, movie)}/>
                       <FaListAlt onClick={()=>{handleOnSeeMoreDetails(movie)}} className="seeIcon"/>
              
                     
                    </div>
                     <MdOutlineReadMore className="readMoreIcon" onClick={() => { handleOnDesp(movie.id) }} />
                      </div>
                    <p className={openDesp === movie.id ? "openDiv" : "closeDiv"}>{movie.overview  || "Overview not available yet."}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}