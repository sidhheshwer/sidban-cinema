import React, { useContext, useEffect } from "react";
import { GiBrain, GiFilmSpool } from "react-icons/gi";
import "../stylesheets/sidbanCinemaAbout.css";
import SidbanFooter from "./SidbanFooter";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";

export default function SidbanCinemaAbout() {
  const {checkAuth} = useContext(SidbanMoviesContext);
 const redirect = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const status = await checkAuth();
      if (status !== 200) {
        redirect("/login");
      }
    }
  
    checkUser();
  }, [redirect,checkAuth]);

  return (
    <>
    <div className="aboutContainer" style={{ backgroundImage: ` linear-gradient( rgba(0, 0, 0, 0.99), rgba(0,0,0,0.85) ), url('/SidbanCinemaBack.png') `, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="aboutHero">

        <div className="aboutLogo">
          <h1>
            Sid<span className="banText">ban</span>Cinema
          </h1>
          <GiFilmSpool className="aboutIcon" />
        </div>

        <p className="aboutTagline">
          For everyone who has ever laughed, cried, dreamed, or found hope
          through the magic of cinema.
        </p>

   

         <div className="quoteDiv">
            <div className="quote">
          "What excites me about filmmaking is finding new ways to tell stories." 
          <p className="quoteSub">--Christopher Nolan</p>
     
        </div>
       </div>
        
      </div>

      <section className="aboutSection">
        <h2>About SidbanCinema</h2>

        <p>
          SidbanCinema is a personal portfolio project created and developed by
          <strong> Sidhheshwer Bansode</strong>. The platform was built to
          explore modern full-stack development while celebrating the art of
          storytelling through movies and television.
        </p>

        <p>
          Cinema is more than entertainment. It inspires us, teaches us,
          challenges us, and often stays with us long after the credits roll.
          SidbanCinema was created out of a passion for both technology and the
          stories that bring people together.
        </p>

             <div className="quoteDiv">
            <div className="quote">
          "Jo dikhta hai humko lagta hai, hai... Aur jo nahi dikhta humko lagta hai, nahi hai. Lekin kabhi kabhi jo dikhta hai, wo nahi hota..aur jo nahi dikhta, woh hota hai" 
          <p className="quoteSub">--Ishan Nand Kishore Awasthi<br/>(Taare Zameen Par)</p>
     
        </div>
       
        </div>
      </section>

      <section className="aboutSection">
        <h2>Technologies Used</h2>

        <ul>
          <li>⚛️ React.js</li>
          <li>☕ Spring Boot</li>
          <li>🍃 MongoDB</li>
          <li>🎬 TMDB API</li>
          <li>🔗 REST APIs</li>
          <li>🎥 Third-Party Streaming Players</li>
          <li>🌐 Responsive Web Design</li>
        </ul>
       <div className="quoteDiv">
            <div className="quote">
          "Bachpan mujhse kehta hai mai bohot special hoon. Lekin usko toh maine kuchal diya." 
          <p className="quoteSub">--Ved Vardhan Sahni.<br/>(Tamasha)</p>
     
        </div>
       
        </div>
       
      </section>

      <section className="aboutSection">
        <h2>Project Purpose</h2>

        <p>
          This project was developed for educational purposes and portfolio
          demonstration. It showcases full-stack application architecture,
          frontend development, backend API integration, caching, responsive
          design, and real-world software engineering practices.
        </p>

         <div className="quoteDiv">
            <div className="quote">
          "Why do we fall? So we can learn to pick ourselves up." 
          <p className="quoteSub">--Thomas Wayne<br/>(Batman Begins)</p>
     
        </div>
       
        </div>
      </section>

      <section className="aboutSection">
        <h2>Content & Streaming Information</h2>

        <p>
          SidbanCinema does not host, upload, store, or distribute movies,
          television episodes, or video files on its servers.
        </p>

        <p>
          Movie information such as posters, ratings, descriptions, cast
          information, and metadata is provided through external services such
          as TMDB.
        </p>

        <p>
          Streaming content is displayed through third-party player providers
          that operate independently from SidbanCinema.
        </p>

         <div className="quoteDiv">
            <div className="quote">
          "Life is like a box of chocolates. You never know what you’re gonna get." 
          <p className="quoteSub">--Mama always said<br/>(Forrest Gump)</p>
     
        </div>
       
        </div>
      </section>

      <section className="aboutSection piracySection">
        <h2>Anti-Piracy Policy</h2>

        <p>
          Piracy is illegal and harms the people who create the movies and shows
          we love.
        </p>

        <p>
          Filmmakers, actors, writers, artists, editors, musicians, and
          production teams invest years of effort into creating great stories.
          Supporting official platforms helps ensure that more stories can be
          told in the future.
        </p>

        <p>
          SidbanCinema does not encourage, support, or promote piracy in any
          form.
        </p>

        <p>
          Users are strongly encouraged to support official streaming services
          and content creators whenever possible.
        </p>

         <div className="quoteDiv">
            <div className="quote">
          "Hope is a good thing, maybe the best of things." 
          <p className="quoteSub">--Andy Dufresne<br/>(The Shawshank Redemption)</p>
     
        </div>
       
        </div>
      </section>

      <section className="aboutSection">
        <h2>Privacy & Responsibility</h2>

        <p>
          SidbanCinema respects user privacy and does not intentionally collect
          or sell personal information for commercial purposes.
        </p>

        <p>
          Technology should be used responsibly, ethically, and with respect for
          intellectual property and creative work.
        </p>

        <div className="quoteDiv">
            <div className="quote">
          "It’s only after we’ve lost everything that we’re free to do anything." 
          <p className="quoteSub">--Tyler Durden<br/>(Fight Club)</p>
     
        </div>
       
        </div>
      </section>


      <section className="aboutSection">
             <h2>Powered by Sid<span className="banText">ban</span>AI</h2>

          <p>

            Sid<span className="banText">ban</span>AI is the intelligent assistant integrated
            inside SidbanCinema.

            It helps users understand news articles faster
            using AI-generated summaries, explanations,
            highlights, and contextual insights in a modern,
            easy-to-read format.

          </p>

<div className="quoteDiv">
            <div className="quote">
          "Love is the one thing that transcends time and space." 
          <p className="quoteSub">--Dr.Amelia Brand<br/>(intestellar)</p>
     
        </div>
       
        </div>
          <a
            href="https://sidbanai.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="aboutSidbanButton"
          >
            Explore Sid<span className="banText">ban</span>AI
            <GiBrain style={{color:"red"}}/>
          </a>
      </section>


      <section className="aboutSection">
         <h2>Contact & Creator</h2>

          <p className="aboutText">

            Sid<span className="banText">ban</span>Cinema was created and developed by
            Sidhheshwer Bansode, a software engineer
            focused on modern web applications,authentication systems, and backend development.

          </p>

          <div className="quoteDiv">
            <div className="quote">
          "You talkin’ to me?" 
          <p className="quoteSub">--Travis Bickle<br/>(Taxi Driver)</p>
     
        </div>
       
        </div>

          <a
            href="https://sidban-portfolio.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="aboutSidbanButton"
          >
            Visit Sid<span className="banText">ban</span>-Portfolio
            <MdAdminPanelSettings style={{color:"red"}} />
          </a>
      </section>

      <section className="aboutSection developerNote">
        <h2>A Note From The Developer</h2>

        <p>
          SidbanCinema started as an idea fueled by a passion for movies,
          storytelling and cinematography.
        </p>

 

          <div className="quoteDiv">
            <div className="quote">
          "Dreams are the silent promises we make to ourselves." 
          <p className="quoteSub">--Sidhheshwer Bansode<br/>(Living Between Dreams and Reality)</p>
     
        </div>
       
        </div>
         <sub style={{color:"red",opacity:"0.5"}}>See you at the movies</sub>


      </section>
      

             <div className="quoteDiv">
            <div className="quote">
          "I suppose in the end, the whole of life becomes an act of letting go, but what always hurts the most is not taking a moment to say goodbye." 
          <p className="quoteSub">--Irrfan Khan<br/>(Life of pi)</p>
     
        </div>
       
        </div>
    </div>
    <SidbanFooter/>
    </>
  );
}