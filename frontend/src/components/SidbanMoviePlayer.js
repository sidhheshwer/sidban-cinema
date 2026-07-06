import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { IoClose } from "react-icons/io5";
import "../stylesheets/sidbanPlayer.css";
import { FaDiagramNext } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdHome } from "react-icons/md";
export default function SidbanMoviePlayer() {

  const { getSidbanPlayer, sidbanUrl } = useContext(SidbanMoviesContext);

  const { id } = useParams();

  const [currentPlayer, setCurrentPlayer] = useState("");
  const [showPlayers,setShowPlayers]=useState(false);
 const redirect=useNavigate()



useEffect(() => {
  const fetchPlayer = async () => {
    let retries = 5;

    while (retries > 0) {
      try {
        await getSidbanPlayer(id);
        break; // success
      } catch (error) {
        retries--;

        if (retries === 0) {
          console.error(error);
             
        
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  };

  fetchPlayer();
  // eslint-disable-next-line
}, [id]);

  useEffect(() => {
    if (sidbanUrl?.urls?.length > 0) {
      setCurrentPlayer(sidbanUrl.urls[0]);
    }
  }, [sidbanUrl]);


  function handleOnShowSidbanPlayers() {
  
    setShowPlayers(true);
  }

  function handleOnCloseSidbanPlayers(){
    setShowPlayers(false);
  }
  
    if(!currentPlayer){
      redirect("/not-found")
    }

      function handleOnHome() {
        
    redirect("/home");
  }

  return (
    <div className="mainSidbanPlayerDiv">
      
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

      <button className="sidbanPlayerBtn" onClick={handleOnShowSidbanPlayers}> <FaDiagramNext className='nextSidbanPlayer'/></button>

      
      <div className="playerButtons">

        {sidbanUrl?.urls?.map((url, index) => (
          <button key={index} onClick={() => setCurrentPlayer(url)}>
            Sidban Player {index + 1}
          </button>
        ))}

      </div>

      <iframe className="sidbanPlayerDiv" src={currentPlayer + '?color=ff0000'} title="movie" frameBorder="0" allowFullScreen/>
    <div className={showPlayers ? "openPlayerDiv" : "closePlayerDiv"}  >
        
        <div className="closePlayersDiv">
        <h3>Sid<span className="banText">ban</span>Cinema</h3><IoClose className="closePlayers" onClick={handleOnCloseSidbanPlayers}/>
        </div>
        
        
        <div className="playBtn" onClick={() => {setCurrentPlayer(sidbanUrl.urls[0]);setShowPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
         Sid<span className='banText'>ban</span>Cinema Player 1
        </div>

        <div className="playBtn" onClick={() => {setCurrentPlayer(sidbanUrl.urls[1]);setShowPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          Sid<span className='banText'>ban</span>Cinema Player 2
        </div>

        <div className="playBtn" onClick={() => {setCurrentPlayer(sidbanUrl.urls[2]);setShowPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          Sid<span className='banText'>ban</span>Cinemaa Player 3
        </div>

        <div className="playBtn" onClick={() => {setCurrentPlayer(sidbanUrl.urls[3]);setShowPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          Sid<span className='banText'>ban</span>Cinema Player 4
        </div>

        <div className="playBtn" onClick={() => {setCurrentPlayer(sidbanUrl.urls[4]);setShowPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
         Sid<span className='banText'>ban</span>Cinema Player 5
        </div>

        <div className="playBtn" onClick={() => {setCurrentPlayer(sidbanUrl.urls[5]);setShowPlayers(false)}} style={{ backgroundImage: ` linear-gradient( rgba(0,0,0,0.85), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
          Sid<span className='banText'>ban</span>Cinema Player 6
        </div>
      </div>



    </div>


  );
}