import React, { useContext, useEffect, useRef, useState } from "react";
import "../stylesheets/categorypage.css";
import { SidbanMoviesContext } from "../context/SidbanMoviesContext";
import { IoMdPlayCircle } from "react-icons/io";
import { MdOutlineReadMore, MdStarRate, MdHome } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SidbanMovieLoader from "./SidbanMovieLoader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

export default function CategoryPage() {
  const [openDesp, setOpenDesp] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  const redirect = useNavigate();
  const { genreName } = useParams();

  const { generNames, movies, sidbanError,setSeeOverview ,baseUrl,checkAuth,setOpenSidbanAI,handleOnSidbanAI,postSidbanHistory} = useContext(SidbanMoviesContext);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  const loaderRef = useRef(null);

  const filteredMovies = (movies?.results || []).filter((movie) =>
    movie.genre_ids.includes(Number(generNames))
  );

  

useEffect(() => {
  async function checkUser() {
    const status = await checkAuth();

    if (status !== 200) {
      redirect("/login");
    }
  }

  checkUser();
}, [redirect,checkAuth]);

  useEffect(() => {
    setAllMovies(filteredMovies);
    setPage(1);
    // eslint-disable-next-line
  }, [movies, generNames]);


    useEffect(() => {
  const timer = setTimeout(() => {
    setShowLoader(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

 
  useEffect(() => {
    if (sidbanError) {
      redirect("/error");
    }
  }, [sidbanError, redirect]);

 
  useEffect(() => {
    if (page === 1) return;
    if (page > 30) return;

    const loadMoreMovies = async () => {
      try {
        setLoadingMore(true);

        const response = await axios.get(
          `${baseUrl}/sidban-cinema/category?page=${page}`
        );

        const nextMovies = (response.data.results || []).filter((movie) =>
          movie.genre_ids.includes(Number(generNames))
        );

        setAllMovies((prevMovies) => {
          const existingIds = new Set(
            prevMovies.map((movie) => movie.id)
          );

          const uniqueMovies = nextMovies.filter(
            (movie) => !existingIds.has(movie.id)
          );

          return [...prevMovies, ...uniqueMovies];
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMore(false);
      }
    };

    loadMoreMovies();
  }, [page, generNames,baseUrl]);



  


  useEffect(() => {
    if (page >= 30) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !loadingMore) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadingMore, page]);



  useEffect(() => {
  if (filteredMovies.length > 0) {
    localStorage.setItem(
      "sidbanCategoryMovies",
      JSON.stringify(filteredMovies)
    );
  }
}, [filteredMovies]);

useEffect(() => {
  const savedMovies = localStorage.getItem("sidbanCategoryMovies");

  if (savedMovies) {
    setAllMovies(JSON.parse(savedMovies));
  }
}, []);

  function handleOnDesp(id) {
    setOpenDesp(openDesp === id ? null : id);
  }

  function handleOnHome() {
    redirect("/home");
  }



    function handleOnPlayMovie(e, movie) {
    e.preventDefault();
      postSidbanHistory(movie)
    redirect(`/sidban-player/${movie.title}/${movie.id}`);
  }


   function handleOnSeeMoreDetails(movies){

  localStorage.setItem(
    "sidbanOverview",
    JSON.stringify(movies)
  );
    setSeeOverview(movies);
     
   redirect(`/overview/${movies.title || movies.name}/${movies.media_type || "movie"}`, {
    state: movies
  });
  }


   async function handleOnSendMovie(data){
   setOpenSidbanAI(true);
   await handleOnSidbanAI(data);
 }
  
  return (
    <>

      <div className="genHeadDiv">
        <div className="genLine"></div>

        <div className="genBtnDiv" onClick={handleOnHome}>
          <h2 className="genHead">{genreName}</h2>

          <p className="genbackHome">
            <IoMdArrowRoundBack className="genArrow" />
            <MdHome className="homeLogo" />
          </p>
        </div>
      </div>

{showLoader? <SidbanMovieLoader/>  :
      <div className="genereContainer">
        {allMovies.map((movie) => (
          <div
            className="genDiv"
            key={movie.id}
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), transparent), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="genDetails">
              <h3 className="genMovieHead">
                {movie.title || movie.name}
              </h3>
                <div className="sidbanGeners">
                                     <p className="genres">{genreName} </p>
                                          <div className="sidbanAIDiv2">
                                          <p onClick={()=>{handleOnSendMovie(movie)}}>Ask Sid<span className="banText">ban</span>AI</p><GiBrain className="sidbanAIIcon"/><br/>
                                          </div>
                                     </div>

              <div className="genVoteDiv">
                <p className="genvotes">
                  <MdStarRate className="starIcon" />
                  &nbsp;{movie.vote_average}
                </p>

                <p className="genvotes">
                  <BiSolidLike className="likeIcon" />
                  &nbsp;{movie.vote_count} votes
                </p>

                <p className="genvotes">
                  <HiCalendarDateRange className="dateIcon" />
                  &nbsp;{movie.release_date}
                </p>
              </div>

              <div className="playReadDivMain">
                                  <div className="playReadDiv">
                                    <IoMdPlayCircle onClick={(e) =>  handleOnPlayMovie( e, movie)}/>
                                     <FaListAlt onClick={()=>{handleOnSeeMoreDetails(movie)}} className="seeIcon"/>
                                   
                                  </div>
                <MdOutlineReadMore
                  className="readMoreIcon"
                  onClick={() => handleOnDesp(movie.id)}
                />
              </div>

              <p
                className={
                  openDesp === movie.id
                    ? "openDiv"
                    : "closeDiv"
                }
              >
                {movie.overview || "Overview not available yet."}
              </p>
            </div>
          </div>
        ))}
      </div>}

      {loadingMore && (
        <div className="bottomLoader">
          <SidbanMovieLoader />
        </div>
      )}

      <div
        ref={loaderRef}
        style={{
          height: "100px",
          width: "100%",
        }}
      />
    </>
  );
}