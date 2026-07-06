import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/overview.css";
import { MdDateRange, MdStarRate } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { IoPlayCircle } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import SidbanFooter from "../components/SidbanFooter";
import SidbanMovieLoader from "../components/SidbanMovieLoader";
import { GiBrain } from "react-icons/gi";

export default function SidbanOverview() {
    const { baseUrl, cast, setCast,loading,setLoading,handleOnSidbanAI,setOpenSidbanAI,postSidbanHistory } = useContext(SidbanMoviesContext);
    const [currentOverview, setCurrentOverview] = useState(null);
    const redirect = useNavigate();
    const {type}=useParams();
   
    
const location = useLocation();


const genres = {
  // Shared / Movie
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




useEffect(() => {
    const saved = JSON.parse(
        localStorage.getItem("sidbanOverview") || "null"
    );

    setCurrentOverview(saved);
}, [location.pathname]);


    useEffect(() => {
        if (!currentOverview?.id) return;


        const loadCast = async () => {
            let retries = 5;
           setLoading(true);

            while (retries > 0) {
                try {
                   
                    const response = await axios.get(
                        `${baseUrl}/sidban-cinema/credits/${type}/${currentOverview.id}`
                    );
                  
                    setCast(response.data);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    setLoading(false);
                    return;
                } catch (error) {
                    retries--;

                    if (retries === 0) {
                      
                        redirect("/error");
                    }

                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                 
            }
        };

        loadCast();
        // eslint-disable-next-line
    }, [currentOverview, redirect, baseUrl]);



    


    if (!currentOverview) {
        return <SidbanMovieLoader />;
    }




    function handleOnSeeMovie(e, title, id,type="movie",movie) {
        e.preventDefault();
       postSidbanHistory(movie)
      if(type==='movie'){
   redirect(`/sidban-player/${title}/${id}`);
     }
     else if (type === "tv") {
    redirect(`/sidban-player/series/${title}/${id}`);
  }
    }

    if(loading){
       return <SidbanMovieLoader />
    }

    
async function handleOnSendMovie(data){
   setOpenSidbanAI(true);
   await handleOnSidbanAI(data);
 }

    return (

       
        <>
            <div className="seeOverviewDiv">
                <div className="seeOver" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0,0,0,0.95),rgba(0,0,0,0.95)), url(${currentOverview?.backdrop_path ? `https://image.tmdb.org/t/p/original${currentOverview.backdrop_path}` : "/SidbanCinemaBack.png"})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} >



                    <div className="seeOverviewHead">

                        <h1 className="seeHead">{currentOverview.title || currentOverview.name}</h1>
                        <p className="seeGenres">{currentOverview.genre_ids?.map((id) => genres[id]).filter(Boolean).join(" • ")} </p>

                        <div className="seeVotesDiv">
                            <p className="seeVotes"><MdStarRate className="starIcon" /> {String(currentOverview.vote_average).slice(0, 3)}</p>

                            <p className="seeLike"><BiSolidLike className="likeIcon" />{currentOverview.vote_count} votes</p>
                            <p className="seeDate"><MdDateRange className="dateIcon" />{currentOverview.release_date || currentOverview.first_air_date}</p>


                        </div>
                        <p className="seePara">{currentOverview.overview || "Overview not available yet."}</p>

                        <div className="seePlayAIDiv">
                       
                       <IoPlayCircle className="playButton" onClick={(e) => handleOnSeeMovie(e, currentOverview.title || currentOverview.name , currentOverview.id,currentOverview.media_type,currentOverview)} />
                       <div className="sidbanAIDiv">
                         
                                             <p onClick={()=>{handleOnSendMovie(currentOverview)}}>Ask Sid<span className="banText">ban</span>AI</p><GiBrain className="sidbanAIIcon"/><br/>
                                             
                                           </div>
                    </div>
                    
                    </div>

                </div>
               

            </div>

             <div className="sidbanCastDiv">
                    <h1 className="seeCastHead">
                        Cast <span className="castAnd">&</span> Crew
                    </h1>
                    {cast?.cast?.map((actor, index) => (
                        <div key={index} className="castDiv">
                            <img className="castImage" src={actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : "/Sidban.png"} alt="cast-name" />
                            <div className="castDetailsDiv">
                                <p className="castActor">{actor.name || "Unknown Actor"}</p>
                                <p className="castSeparator">as</p>
                                <p className="castCharacter">{actor.character || "Role Unlisted"} </p>
                            </div>
                        </div>
                    ))}
                </div>
            <SidbanFooter />

        </>
        
    );
}