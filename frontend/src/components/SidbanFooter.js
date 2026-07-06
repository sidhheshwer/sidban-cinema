import React from "react";
import "../stylesheets/footer.css";
import { FaGithub, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function SidbanFooter() {
  return (
    <footer className="footerContainer">

      <div className="footerBrand">
        <h2>
          Sid<span className="brandRed">ban</span>Cinema
          </h2>
       
        <p style={{fontSize:"0.8rem"}}>
          Built for those who find a piece of themselves in every movie.<br/><span style={{color:"white"}}>Sid</span>hheshwer <span style={{color:"red"}}>Ban</span>sode.
        </p>
      </div>

      <div className="footerLinks">
        <a href="https://github.com/sidhheshwer" target="_blank" rel="noreferrer">
          <FaGithub style={{color:"red"}}/> GitHub
        </a>


        <a href="https://instagram.com/sidhheshwer" target="_blank" rel="noreferrer">
          <FaInstagram style={{color:"red"}}/> Instagram
        </a>

        <a href="mailto:2000sidhheshwerbr@gmail.com">
          <FaEnvelope style={{color:"red"}} /> Email
        </a>
      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} SidbanCinema — All rights reserved.
      </div>

    </footer>
  );
}