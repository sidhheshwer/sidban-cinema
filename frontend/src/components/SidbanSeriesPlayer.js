import React, { useContext, useEffect } from 'react'
import { SidbanMoviesContext } from '../context/SidbanMoviesContext'
import { useNavigate, useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import SidbanEpisodes from './SidbanEpisodes';
import { FaDiagramNext } from "react-icons/fa6";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdHome } from 'react-icons/md';



export default function SidbanSeriesPlayer() {
    const {sidbanUrl,getSidbanSeriesPlayer,getSeriesDetails,episodeData,getSidbanSeriesPlayerTwo,showSeriesPlayers,setShowSeriesPlayers,setShowEpisodePanel, currentSeriesPlayer,setCurrentSeriesPlayer}=useContext(SidbanMoviesContext);

   const {title,id,season,episode}=useParams();
   const redirect=useNavigate();


 useEffect(() => {
    getSidbanSeriesPlayer(title,id);
    // eslint-disable-next-line
  },[id,title]);

   useEffect(() => {
    getSidbanSeriesPlayerTwo(title,id,season,episode);
    // eslint-disable-next-line
  },[id,title,season,episode]);




   useEffect(() => {

      getSeriesDetails(id);

    // eslint-disable-next-line
  },[id]);

   useEffect(() => {
      if (sidbanUrl?.urls?.length > 0) {
        setCurrentSeriesPlayer(sidbanUrl.urls[0]);
      }
      
    }, [sidbanUrl,setCurrentSeriesPlayer]);


  


   

  
    function handleOnShowSidbanSeriesPlayers() {
      setShowEpisodePanel(false);
      setShowSeriesPlayers(true);
    }
  
    function handleOnCloseSidbanSeriesPlayers(){
      setShowSeriesPlayers(false);
    }


    if(!currentSeriesPlayer){
      redirect("/not-found")
    }
 
    function handleOnHome(){
      redirect("/home")
    }
  
  return (
   <div className="mainSidbanPlayerDiv" >

     <div className="genPlayerHeadDiv">
            <div className="genPlayerLine"></div>
             <div className="genBtnPlayerDiv" onClick={handleOnHome}>
              <h2 className="genPlayerHead">Sid<span className="banText">ban</span>Player</h2>
    
              <p className="genbackPlayerHome">
                <IoMdArrowRoundBack className="genPlayerArrow" />
                <MdHome className="homePlayerLogo" />
              </p>
              </div>
            </div>
         <button className="sidbanPlayerBtn" onClick={handleOnShowSidbanSeriesPlayers} ><FaDiagramNext className='nextSidbanPlayer'/></button>
   
         
         <div className="playerButtons">
   
           {sidbanUrl?.urls?.map((url, index) => (
             <button key={index} onClick={() => setCurrentSeriesPlayer(url)}>
               Sidban Player {index + 1}
             </button>
           ))}
   
         </div>
   
 <iframe className="sidbanPlayerDiv" src={currentSeriesPlayer + "?color=ff0000"} title="movie" frameBorder="0" allowFullScreen /> 
         <div className={showSeriesPlayers?'openPlayerDiv':'closePlayerDiv'} >
           
          <div className="closePlayersDiv">
                 <h3>Sid<span className="banText">ban</span>Cinema</h3><IoClose className="closePlayers" onClick={handleOnCloseSidbanSeriesPlayers}/>
            </div>
           
           <div className="playBtn" onClick={() => {setCurrentSeriesPlayer(sidbanUrl.urls[0]); setShowSeriesPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} >
             Sid<span className='banText'>ban</span>Cinema Player 1
           </div>
   
           <div className="playBtn" onClick={() => {setCurrentSeriesPlayer(sidbanUrl.urls[1]); setShowSeriesPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
             Sid<span className='banText'>ban</span>Cinema Player 2
           </div>
   
           <div className="playBtn" onClick={() => {setCurrentSeriesPlayer(sidbanUrl.urls[2]); setShowSeriesPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
             Sid<span className='banText'>ban</span>Cinema Player 3
           </div>
   
           <div className="playBtn" onClick={() => {setCurrentSeriesPlayer(sidbanUrl.urls[3]); setShowSeriesPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
             Sid<span className='banText'>ban</span>Cinema Player 4
           </div>
   
           <div className="playBtn" onClick={() => {setCurrentSeriesPlayer(sidbanUrl.urls[4]); setShowSeriesPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            Sid<span className='banText'>ban</span>Cinema Player 5
           </div>
   
           <div className="playBtn" onClick={() => {setCurrentSeriesPlayer(sidbanUrl.urls[5]); setShowSeriesPlayers(false)}}style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
             Sid<span className='banText'>ban</span>Cinema Player 6
           </div>
         </div>
   
        <SidbanEpisodes episodeData={episodeData} onPlayEpisode={(season, episode) => { getSidbanSeriesPlayer(id, season, episode);
  }}
/>
   
       </div>
  )
}
