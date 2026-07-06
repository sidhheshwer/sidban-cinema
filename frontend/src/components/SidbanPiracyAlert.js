import React, { useContext, } from 'react'
import "../stylesheets/sidbanPiracy.css";
import { GiFilmSpool } from 'react-icons/gi';
import { SidbanMoviesContext } from '../context/SidbanMoviesContext';

export default function SidbanPiracyAlert() {

    const { showPiracy, setShowPiracy } = useContext(SidbanMoviesContext);


   
   
    function handleOnSidbanPiracy() {
        localStorage.setItem("sidbanAlert", "accepted");
     setShowPiracy(false);
    }
    return (
     showPiracy ?(
     < div className = 'sidbanPiracyDiv' >

        <div className='sidbanPiracyMain'>
            <div className='piracyHeadDiv'>
                <p className='piracyHead'>Sid<span className='banText'>ban</span>Cinema</p>
                <GiFilmSpool className='piracyHeadIcon' />
            </div>
            <h1 className='piracyAlertHead'>Sid<span className='banText'>ban</span> Piracy Alert</h1>
            <div className='piracyMessageDiv' style={{ backgroundImage: `url(/SidbanCinemaBack.png)`, backgroundPosition: "center", backgroundSize: "cover" }}>
                <div className='piracyMessage'>

                    <div className="piracy-disclaimer">
                        <p className='piracyDev'><span style={{ color: "white" }}>Sid</span>ban Official Statement</p>
                        <p className='piracyPara'>
                            SidbanCinema is a portfolio project created strictly for educational and demonstration purposes only.
                        </p>
                       <hr className='alertLines'/>
                        <p className='piracyPara'>
                            This project does not promote, support, or encourage piracy in any form.
                            All movies, series, images, trademarks, and related content belong to their
                            respective owners and copyright holders.
                        </p>
                         <hr className='alertLines'/>
                        <p className='piracyPara'>
                            SidbanCinema does not host, store, or upload any media content on its own servers.
                            Content displayed on this platform is sourced through publicly available
                            third-party services and APIs.
                        </p>
                          <hr className='alertLines'/>
                        <p className='piracyPara'>
                            If you are a copyright owner and believe any content violates your rights,
                            please contact the respective content provider.
                        </p>
                        <hr className='alertLines'/>
                        <p className='piracyPara'>
                        As a film enthusiast, I personally encourage watching movies through theaters or licensed streaming platforms.
                   I deeply respect cinema as an art form and do not support piracy under any circumstances.
                      </p>


                        <p className='sidSignDiv'>
                            <img src='/sidbanSignature.png' alt='sidban sign' className='sidbanSignature' />
                            <strong>— Sidhheshwer Bansode</strong>
                        </p>
                    </div>
                </div>
            </div>
            <button className='piracyBtn' onClick={handleOnSidbanPiracy}>Agree</button>
        </div>
    </div >
     ):null

  )
}
