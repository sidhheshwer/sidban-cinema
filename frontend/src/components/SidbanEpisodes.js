import React, { useContext, useEffect, useState } from "react";
import "../stylesheets/episodes.css";
import { IoClose, IoPlay } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosBrowsers } from "react-icons/io";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { RiMovieAiFill } from "react-icons/ri";
import { MdReadMore } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { HiCalendarDateRange } from "react-icons/hi2";
import { GiFilmSpool } from "react-icons/gi";
export default function SidbanEpisodes({ episodeData }) {
  const {setShowSeriesPlayers,showEpisodePanel, setShowEpisodePanel}=useContext(SidbanMoviesContext);

  const [selectedSeason, setSelectedSeason] = useState(1);

  const [showSeasonDetails,setShowSeasonDetails]=useState(false);

  const {id,title}=useParams();
  const redirect=useNavigate();



 useEffect(() => {
  if (episodeData?.seasons?.length > 0) {
    const firstRealSeason = episodeData.seasons.find(
      season => season.season_number > 0
    );

    setSelectedSeason(firstRealSeason);
  }
}, [episodeData]);

  function handleOnSelectedEpisode(episodeNumber,seasonName){
  
     setShowEpisodePanel(false);
    
    redirect(`/sidban-player/series/${title}/${id}/${seasonName}/${episodeNumber}`);
  }



  




    function handleOnOpenEpisodePanel(){
    setShowSeriesPlayers(false);
    setShowEpisodePanel(true)
  }

  function handleOnCloseEpisodePanel(){
    setShowEpisodePanel(false);
  }
 
 function handleOnShowSeasonDetails(){
  if(!showSeasonDetails){
  setShowSeasonDetails(true);
  }
  else{
    setShowSeasonDetails(false);
  }
 }

 function handleOnClickSeason(season){
  
    setSelectedSeason(season)
 }
 




  return (
    <>
    
      <button className={!showEpisodePanel?"episodesBtn":"episodeBtnNone"} onClick={handleOnOpenEpisodePanel}><IoIosBrowsers/> </button>

      <div className={showEpisodePanel ? "episodePanel open" : "episodePanel"} style={{ backgroundImage: `linear-gradient( rgba(0,0,0,0.3), rgb(0, 0, 0)),url(${ selectedSeason?.poster_path ? `https://image.tmdb.org/t/p/original${selectedSeason.poster_path}` : "/SidbanCinemaBack.png" })`}}>
       


        <div className="episodePanelHeader" style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.58),rgb(0, 0, 0)),url(${ selectedSeason?.poster_path ? `https://image.tmdb.org/t/p/original${selectedSeason.poster_path}` : "/SidbanCinemaBack.png" })`}}>
         <div className="closeEpisodePanel" onClick={handleOnCloseEpisodePanel}> 
          <div>
          <h4>Sid<span className='banText'>ban</span>Cinema<GiFilmSpool style={{color:"red",fontSize:"1.5rem"}}/></h4>
          </div>
          
          <IoClose className="closePanel"/>
          </div>
       
      
          <h2 className="seriesTitle">{episodeData?.name}</h2>
             
         <div className="seriesDateDiv">
           <HiCalendarDateRange className="seriesDateIcon"/>
          <p className="seasonDate">{selectedSeason?.air_date}</p>
       
         </div>
        
        
        <div className="seasonDetail">
        <h3 className="seriesSeasons">Season {selectedSeason.season_number}</h3>
        <MdReadMore className="seasonRead" onClick={handleOnShowSeasonDetails}/>
        </div>
        <p className={showSeasonDetails?"seasonPara":"noSeasonPara"}>{episodeData.overview || "Overview not available yet."}</p>
      

      
           <div className="seasonButtons">
          
          {episodeData?.seasons?.filter(season=>season.season_number>0).map((season) => (
            <div key={season.id} className={selectedSeason?.id === season.id ? "seasonBtn activeSeason" : "seasonBtn"}   onClick={() => {handleOnClickSeason(season)}}>
             
              <p className="seasonNumber">S{season.season_number}</p>
     
              </div>
          ))}
        </div>
        </div>


      
     
 
      
         <div className="episodeDiv">
           <div className="epHeadDiv">
             <h2 className="epHead">Episodes</h2>
                <FaThList className="epListIcon"/>
           </div>
        {selectedSeason && (
           
             <div className="episodeList">
     

            {Array.from(
              { length: selectedSeason.episode_count },
              (_, i) => (
                <>
               
                <div key={i} className="episodeBtn" onClick={()=>{handleOnSelectedEpisode(i+1,selectedSeason.season_number)}} >
          
                   <p className="epName"> <RiMovieAiFill className="epIcon"/> Episode {i + 1}</p>
                   <IoPlay className="epPlay"/>
                </div>
                </>
              )
            )}
          </div>
        )}
        </div>
      </div>
    </>
  );
}