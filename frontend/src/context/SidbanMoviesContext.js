import { createContext, useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";




export const SidbanMoviesContext = createContext();

export const SidbanMoviesContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidbanUrl, setSidbanUrl] = useState();
  const [showNav, setShowNav] = useState(false);
  const [generNames, setGenereNames] = useState([]);
  const [sidbanError, setSidbanError] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [episodeData,setEpisodeData]=useState([]);
   const [showSeriesPlayers,setShowSeriesPlayers]=useState(false);
     const [showEpisodePanel, setShowEpisodePanel] = useState(false);
     const [currentSeriesPlayer, setCurrentSeriesPlayer] = useState("");
    const [seeOveriew, setSeeOverview] = useState(null);
    const[errorMessage,setErrorMessage]=useState("");
    const [aiResponse, setAiResponse] = useState("");
      const [openSidbanAI,setOpenSidbanAI]=useState(false);
      const [aiLoading,setAILoading]=useState(false);
      const [showHistory,setShowHistory]=useState([]);
    const [cast,setCast]=useState([]);
  const [currentLoginUser, setCurrentLoginUser] = useState(null);
  const [showPiracy,setShowPiracy]=useState(true);
   
    
  
  const baseUrl = window.location.origin;
 




  const checkAuth = async () => {
  try {
    const response = await axios.get(`${baseUrl}/sidban-cinema/check-auth`,
      {
        withCredentials: true
      }
    );
   
    return response.status;
  } catch (error) {
   

    return error.response?.status;
  }
};

  const postSigninData = async (signinData) => {
  try {
    const response = await axios.post(`${baseUrl}/sidban-cinema/signin`,signinData,
      {
        withCredentials: true, headers: {
      "Content-Type": "multipart/form-data"
    }
      }
    );
     localStorage.setItem("sidbanUser",JSON.stringify(response.data));
    toast.success(response.data.message,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
    return response.status;
  } catch (error) {
  
    if (error.response?.status === 413) {
    toast.error("Profile pic size should be less than 1 MB", {
      style: {
        backgroundColor: "black",
        color: "white",
        border: "2px solid red"
      }
    });
  } else {
    toast.error(
      error.response?.data?.message || error.message,
      {
        style: {
          backgroundColor: "black",
          color: "white",
          border: "2px solid red"
        }
      }
    );
  }
    
    return error.response?.status;
  
  }
};



  const postLoginData = async (loginData) => {
  try {
    const response = await axios.post(`${baseUrl}/sidban-cinema/login`,
      loginData,
      {
     withCredentials: true,
      headers: {
     "Content-Type": "application/json"
    }
      }
    );
     toast.success(response.data.message,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
     setCurrentLoginUser(response.data.username)
    

     localStorage.setItem("sidbanUser",JSON.stringify(response.data));

   return response.status;
   
  } catch (error) {
  
   
    toast.error(error.response?.data.message || error.message,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
    
    
     return error.response?.status;
  
  }
};


useEffect(() => {
   const storedUser = localStorage.getItem("sidbanUser");

   if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setCurrentLoginUser(parsedUser.username);


   }
}, []);



const getSidbanMoviesData = async () => {
  try {
    setLoading(true);

    const response = await axios.get(`${baseUrl}/sidban-cinema/home`, {
      withCredentials: true,
    });
    
    setMovies(response.data);


    return response.data;
  } catch (error) {
    setSidbanError(true);
    setErrorMessage(error.message)
   
   throw error;
  } finally {
    setLoading(false);
  }
};

  const getSidbanPlayer = async (id) => {
    try {
      const response = await axios.post(`${baseUrl}/sidban-cinema/sidban-player/${id}`, {}, {
        withCredentials: true
      });
     
      setSidbanUrl(response.data);
    } catch (error) {
      setSidbanError(true);
      toast.error(error.message,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
      setErrorMessage(error.message)
     
    }

  }

    const getSidbanSeriesPlayer = async (title,id) => {
    try {
      
      const response = await axios.post(`${baseUrl}/sidban-cinema/sidban-player/series/${title}/${id}`, {}, {
        withCredentials: true
      });
   
      setSidbanUrl(response.data);
    } catch (error) {
      setSidbanError(true);
       toast.error(error.message,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
      setErrorMessage(error.message)
      
    }

  }


  const getSidbanSeriesPlayerTwo = async (title,id,season,episode) => {
    try {
      
      const response = await axios.post(`${baseUrl}/sidban-cinema/sidban-player/series/${title}/${id}/${season}/${episode}`, {}, {
        withCredentials: true
      });
      setSidbanUrl(response.data);
    } catch (error) {
      setSidbanError(true);
       toast.error(error.message,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
          setErrorMessage(error.message)
    
    }

  }


 

  const getSeriesSeason = async (tvId, seasonNumber) => {
  try {
    const response = await axios.get(
      `${baseUrl}/sidban-cinema/series/${tvId}/season/${seasonNumber}`
    );
   
    return response.data;
  } catch (error) {
    setSidbanError(true);
        setErrorMessage(error.message)
    return null;
  }
};


const getSeriesDetails = async (id) => {
 try {
   const response = await axios.get(
    `${baseUrl}/sidban-cinema/series/${id}`
  );

  setEpisodeData(response.data);

 } catch (error) {
         setSidbanError(true);
        setErrorMessage(error.message)
   
 }
};

const getSeasonDetails = async ( tvId,seasonNumber) => {
  const response = await axios.get(
    `${baseUrl}/sidban-cinema/series/${tvId}/season/${seasonNumber}`
  );
  
  return response.data;
};

  const cacheRef = useRef({});

  const getSidbanSearch = useCallback(async (query) => {
    try {

      query = query.trim().toLowerCase();

      if (!query) {
        setSearchResult([]);
        return [];
      }


      if (cacheRef.current[query]) {
        

        setSearchResult(cacheRef.current[query]);

        return cacheRef.current[query];
      }

  

      const response = await axios.get(`${baseUrl}/sidban-cinema/search?query=${encodeURIComponent(query)}`);

      const results = response.data.results || [];


      cacheRef.current[query] = results;


      if (Object.keys(cacheRef.current).length > 500) {
        cacheRef.current = {};
      }

      setSearchResult(results);

      return results;

    } catch (error) {

      throw error;
    }
  }, []);


  
const getSidbanLogout = async () => {
 try {
   const response = await axios.get(`${baseUrl}/sidban-cinema/logout`,{
   withCredentials: true
} );
  toast.success(response.data,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
  return response;

 } catch (error) {
   toast.error(error.response?.data.message,{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
    setSidbanError(true);
  
   
 }
};

async function handleOnSidbanAI(movie) {
     
    try {

        setAILoading(true);

       const response = await fetch( `${baseUrl}/sidban-cinema/sidbanai/summarize`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    title: movie?.title || movie?.name,

                    overview: movie?.overview,

                    imageUrl: movie?.backdrop_path || movie?.poster_path ,

                    type:movie?.media_type || "movie"

                })
            }
        );

       const result = await response.text(); 
        

        setAiResponse(result);

    } catch (error) {

        toast.error("SidbanAI is unavailable right now.", {style: { background: "#111", color: "#fff", border: "1px solid red"}
})
       
        setAiResponse(
            "SidbanAI is unavailable right now."
        );

    } finally {

        setAILoading(false);
    }
}


const getSidbanHistory=useCallback(async()=> {

 if (!currentLoginUser) return;
   try {
     setShowHistory([]);
     const response=await axios.get(`${baseUrl}/sidban-cinema/history/${currentLoginUser}`,
      {},
     {withCredentials:true,headers:{ "Content-Type": "application/json"}});
     setShowHistory(response.data);

   } catch (error) {
    
    if(error.response?.status===404){
       toast.error("No watch history found",{style:{backgroundColor:"black",color:"white",border:"2px solid red"}})
    }
   }
},[currentLoginUser]);


async function postSidbanHistory(data) {


   try {

   


     const response=await axios.post(`${baseUrl}/sidban-cinema/history`,
      {

         title: data.title || data.name,
         overview: data.overview,
         poster: data.poster_path || data.backdrop_path,
         type: data.media_type || "movie",
        release_date:data.release_date || data.first_air_date,
        created_by:currentLoginUser,
        movie_id:data.id
       },
     {withCredentials:true,headers:{ "Content-Type": "application/json"}});
     setShowHistory(response.data);
    
   } catch (error) {
  if (error.response?.status === 500) {
    console.log("Server Error");
  }
}
}





async function deleteSidbanHistory(id) {
  try {
     await axios.delete(`${baseUrl}/sidban-cinema/history/${id}`,{},{withCredentials:true,headers:{ "Content-Type": "application/json"}})
      setShowHistory((prev) =>
      prev.filter((movie) => movie.id !== id)
    );
    
    } catch (error) {
    console.log(error);
  }
}


  return (
    <SidbanMoviesContext.Provider value={{ movies, loading, getSidbanMoviesData, getSidbanPlayer,getSidbanSeriesPlayer,getSidbanSeriesPlayerTwo, sidbanUrl, showNav, setShowNav, generNames, setGenereNames, sidbanError, setSidbanError, openSearch, setOpenSearch, getSidbanSearch, setSearchResult, searchResult, search, setSearch,baseUrl,getSeriesSeason,getSeasonDetails,getSeriesDetails,episodeData,setEpisodeData,showSeriesPlayers,setShowSeriesPlayers,showEpisodePanel, setShowEpisodePanel,currentSeriesPlayer, setCurrentSeriesPlayer,seeOveriew,setSeeOverview,cast,setCast, setLoading,postSigninData,postLoginData,getSidbanLogout,errorMessage,checkAuth,aiResponse,setAiResponse,openSidbanAI,setOpenSidbanAI,handleOnSidbanAI,aiLoading,setAILoading,postSidbanHistory,showHistory,setShowHistory,getSidbanHistory,currentLoginUser,setCurrentLoginUser,deleteSidbanHistory,showPiracy,setShowPiracy}}>
      {children}
    </SidbanMoviesContext.Provider>
  );
};