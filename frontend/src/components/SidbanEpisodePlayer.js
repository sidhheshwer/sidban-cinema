import React, { useContext, useEffect, useState } from 'react'
import { SidbanMoviesContext } from '../context/SidbanMoviesContext'
import { useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import SidbanEpisodes from './SidbanEpisodes';

export default function SidbanSeriesPlayer() {
    const {sidbanUrl,getSidbanSeriesPlayer,getSeriesDetails,episodeData,setEpisodeData,showSeriesPlayers,setShowSeriesPlayers}=useContext(SidbanMoviesContext);

   const {title,id}=useParams();
   const [currentSeriesPlayer, setCurrentSeriesPlayer] = useState("");





 useEffect(() => {
    getSidbanSeriesPlayer(title,id,se);
    // eslint-disable-next-line
  },[id,title]);

   useEffect(() => {
    getSeriesDetails(id);
    // eslint-disable-next-line
  },[id]);

   useEffect(() => {
      if (sidbanUrl?.urls?.length > 0) {
        setCurrentSeriesPlayer(sidbanUrl.urls[0]);
      }
    }, [sidbanUrl]);


   

  
    function handleOnShowSidbanSeriesPlayers() {
      setShowSeriesPlayers(true);
    }
  
    function handleOnCloseSidbanSeriesPlayers(){
      setShowSeriesPlayers(false);
    }

    
    if(!currentSeriesPlayer){
      redirect("/not-found")
    }



  return (
   <div className="mainSidbanPlayerDiv">
         <button className="sidbanPlayerBtn" onClick={handleOnShowSidbanSeriesPlayers}> Sidban Players</button>
   
         
         <div className="playerButtons">
   
           {sidbanUrl?.urls?.map((url, index) => (
             <button key={index} onClick={() => setCurrentSeriesPlayer(url)}>
               Sidban Player {index + 1}
             </button>
           ))}
   
         </div>

   
   
         <iframe className="sidbanPlayerDiv" src={currentSeriesPlayer + '?color=ff0000'} title="movie" frameBorder="0" allowFullScreen />
   
         <div className={showSeriesPlayers?'openPlayerDiv':'closePlayerDiv'}>
           
           
           <IoClose className="closePlayers" onClick={handleOnCloseSidbanSeriesPlayers}/>
           
           
           
           <div className="playBtn" onClick={() => setCurrentSeriesPlayer(sidbanUrl.urls[0])}>
             SidbanCinema Player 1
           </div>
   
           <div className="playBtn" onClick={() => setCurrentSeriesPlayer(sidbanUrl.urls[1])}>
             SidbanCinema Player 2
           </div>
   
           <div className="playBtn" onClick={() => setCurrentSeriesPlayer(sidbanUrl.urls[2])}>
             SidbanCinema Player 3
           </div>
   
           <div className="playBtn" onClick={() => setCurrentSeriesPlayer(sidbanUrl.urls[3])}>
             SidbanCinema Player 4
           </div>
   
           <div className="playBtn" onClick={() => setCurrentSeriesPlayer(sidbanUrl.urls[4])}>
             SidbanCinema Player 5
           </div>
   
           <div className="playBtn" onClick={() => setCurrentSeriesPlayer(sidbanUrl.urls[5])}>
             SidbanCinema Player 6
           </div>
         </div>
   
        <SidbanEpisodes
  episodeData={episodeData}
  onPlayEpisode={(season, episode) => {
   
    getSidbanSeriesPlayer(id, season, episode);
  }}
/>
   
       </div>
  )
}
