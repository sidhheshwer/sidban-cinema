import React from 'react'
import "../stylesheets/sidbanPlayerLoader.css";
import { GiFilmSpool } from 'react-icons/gi';
export default function SidbanPlayerLoader() {



    return (
        <div className='mainPlayerLoaderDiv' style={{ backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.99), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className='errorLoaderHeader'>
                <h2 style={{ cursor: 'pointer' }}>Sid<span className='banText'>ban</span>Cinema</h2><GiFilmSpool className='errorHeadIcon' />
            </div>
            <div className="errorLoaderDetails">
                <p>
                    This content is temporarily unavailable on Sid<span className='banText'>ban</span>Cinema.
                    
                </p>

                <p className="errorSubText">
                    Discover • Stream • Experience Cinema
                </p>
            </div>
        </div>
    )
}
