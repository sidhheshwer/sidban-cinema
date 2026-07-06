import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/searchInput.css";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { MdStarRate } from "react-icons/md";
import {  IoPlayCircle } from "react-icons/io5";
import { MdOutlineReadMore} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaListAlt } from "react-icons/fa";
import { GiBrain, GiFilmSpool } from "react-icons/gi";
export default function SearchInput() {
  const { getSidbanSearch, searchResult,search, setSearch,setSearchResult,setOpenSearch,setSeeOverview,handleOnSidbanAI,setOpenSidbanAI,postSidbanHistory} =useContext(SidbanMoviesContext);


  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchRead,setSearchRead]=useState(false);
  const redirect=useNavigate();
  



  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 1500);

    return () => clearTimeout(timer);
  }, [search]);


 useEffect(() => {
  if (debouncedSearch.length < 3) {
    setLoading(false);
    setSearchError(false);
    return;
  }

  let isMounted = true;

  const fetchMovies = async () => {
    let retries = 5;

    while (retries > 0) {
      try {
        setSearchResult([]);
        setLoading(true);

        await getSidbanSearch(debouncedSearch);

        if (isMounted) {
            setLoading(false)
          setSearchError(false);
        }

        break; 
      } catch (error) {
        retries--;

        if (retries === 0) {
          console.error(error);

          if (isMounted) {
    
            setSearchResult([]);
            setSearchError(true);
          }
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } finally {
        if (isMounted && (retries === 0 || retries < 5)) {
          setLoading(false);
        }
      }
    }
  };

  fetchMovies();

  return () => {
    isMounted = false;
  };
}, [debouncedSearch, getSidbanSearch, setSearchResult]);




  function handleOnSearchRead(id){

    setSearchRead(searchRead === id ? null : id);
    
  }

    function handleOnPlaySearchMovie(title, id,type,movie) {
   
     setSearch("");
    setSearchResult([]);
    setOpenSearch(false);
    postSidbanHistory(movie);
     if(type==='movie'){

   redirect(`/sidban-player/${title}/${id}`);
     }
     else if (type === "tv") {
    redirect(`/sidban-player/series/${title}/${id}`);
  }
  }

     function handleOnSeeMoreDetails(movies){

  localStorage.setItem(
    "sidbanOverview",
    JSON.stringify(movies)
  );
    setSearch("");
    setSearchResult([]);
    setOpenSearch(false);
   
    setSeeOverview(movies);
   
   redirect(`/overview/${movies.title || movies.name }/${movies.media_type}`, {
   state: movies
});
  }

     async function handleOnSendMovie(data){
   setOpenSidbanAI(true);
   await handleOnSidbanAI(data);
 }



  return (
    <div className="searchInputDiv">
      <input className="searchInput" type="text" placeholder="Search Movies, Series..." value={search} onChange={(e) => setSearch(e.target.value)}/>

      {debouncedSearch.length >= 3 && (<div className="searchResultDiv">

          {loading && (
            <div className="searchLoader">
              <p>Sid<span className="banText">ban</span>Cinema is Searching...</p>
            </div>
          )}

          {searchError ? (
            <div className="searchError">
              ⚠️ Some error occurred. Please try again later.
            </div>
          ) : searchResult?.length > 0 ? (
            searchResult
              .map((movie) => (
                <div className="searchingDiv" key={movie.id}>
                <div className="searchCardDiv" >
                  <div className="searchHeadLogo">
                  <p className="searchCardHead">Sid<span className='banText'>ban</span>Cinema </p><GiFilmSpool style={{color:"red",fontSize:"1rem",  opacity: "0.3"}}/>
                  </div>
                  <div className="searchCard" key={movie.id} style={{ backgroundImage: `linear-gradient(to top,rgb(0, 0, 0),rgba(0, 0, 0, 0.53)  , rgba(22, 21, 21, 0.33)),url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,backgroundSize: "cover", backgroundPosition: "center"}}>
                  <img className="searchPoster" src={ movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`: "/Sidban.png"} alt={movie.title || movie.name}  onError={(e) => {  e.target.src = "/Sidban.png";}}/>
                   
                  <div className="searchDetails">
                    <h3>{movie.title || movie.name}</h3>

                    <p className="searchDate"> {movie.release_date || movie.first_air_date ||"Release date unavailable"}</p>

                  

                    <p className="searchRating"> <MdStarRate/> {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</p>
                    
                     <div className="searchPlayDiv">
                     
                      <IoPlayCircle className="searchPlay" key={movie.id}  onClick={() =>  handleOnPlaySearchMovie( (movie.title||movie.name),movie.id,movie.media_type,movie)}/>
                      <FaListAlt onClick={()=>{handleOnSeeMoreDetails(movie)}} className="seeIcon"/>
                      <MdOutlineReadMore className="searchReadMore" onClick={()=>{handleOnSearchRead(movie.id)}}/>
                      </div>
                      </div>
                      
                    </div>
                    <div className="sidbanAIDiv3">
                                                <p onClick={()=>{handleOnSendMovie(movie)}}>Ask Sid<span className="banText">ban</span>AI</p><GiBrain className="sidbanAIIcon"/><br/>
                                           </div>
                  
                 
                </div>
                  <div className="serachOverviewDiv">
                        
                      <p className={searchRead===movie.id?"openSearchOverview":"closeSearchOverview"}>{movie.overview || "Overview not available yet."}</p>
                      </div>
                </div>
              ))
          ) : (
            !loading && (<div className="searchEmpty"> No results found.</div>
            )
          )}
        </div>
      )}
    </div>
  );
}