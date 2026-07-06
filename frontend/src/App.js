import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './components/Home';
import SidbanMoviePlayer from './components/SidbanMoviePlayer';
import CategoryPage from './components/CategoryPage';
import SidbanError from './components/SidbanError';
import SidbanSeries from './components/SidbanSeries';
import SidbanMovies from './components/SidbanMovies';
import SidbanTop from './components/SidbanTop';
import SidbanTrend from './components/SidbanTrend';
import SidbanSeriesPlayer from './components/SidbanSeriesPlayer';
import SidbanPlayerLoader from './components/SidbanPlayerLoader';
import { Toaster } from "react-hot-toast";
import SidbanCinemaAbout from './components/SidbanCinemaAbout';
import SidbanOverview from './components/SidbanOverview';
import SidbanSign from './components/SidbanSign';
import SidbanLogin from './components/SidbanLogin';
import SidbanLayout from './components/SidbanLayout';
import SidbanHistory from './components/SidbanHistory';



function App() {
 
  return (
  <Router>
    <Toaster position="top-center" reverseOrder={false}/>
      <div className="App">
         <SidbanLayout>
       
        <Routes>
         
          <Route path="/" element={<SidbanSign />} />
           <Route path="/login" element={<SidbanLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sidban-player/:title/:id" element={<SidbanMoviePlayer />} />
          <Route path="/sidban-player/series/:title/:id/" element={<SidbanSeriesPlayer />} />
          <Route path="/sidban-player/series/:title/:id/:season/:episode" element={<SidbanSeriesPlayer />} />
          <Route path="/category/:genreName" element={<CategoryPage />} />
          <Route path="/trending" element={<SidbanTrend/>} />
          <Route path="/movies" element={<SidbanMovies/>} />
           <Route path="/series" element={<SidbanSeries/>} />
           <Route path="/top-imdb" element={<SidbanTop/>} />
           
          <Route path="/error" element={<SidbanError />} />
           <Route path="/not-found" element={<SidbanPlayerLoader />} />
           <Route path="/about" element={<SidbanCinemaAbout />} />
            <Route path="/history/:id" element={<SidbanHistory />} />
           <Route path="/overview/:title/:type" element={<SidbanOverview/>} />
        </Routes>
  </SidbanLayout>
      </div>
    </Router>
  );
}

export default App;

