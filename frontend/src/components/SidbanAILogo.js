import React from 'react'
import { GiBrain } from "react-icons/gi";
import "../stylesheets/sidbanailogo.css";
export default function SidbanAILogo() {
  return (
    <div className='logo'>
        <div className='logo4'>
      <div className="logoText">
        Sid<span className='logoText1'>ban</span>
        <span className="logoContainer">
          <span className="logoA">A</span>
          <span className="logoI">I</span>
          <span className="logoText2">ntelligence</span>
        </span>
          <GiBrain className="logoIcon" />
      </div>
      </div>
      </div>
  )
}