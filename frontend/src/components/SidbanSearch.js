import React, { useContext} from 'react'
import "../stylesheets/sidbanSearch.css";
import { IoClose } from "react-icons/io5";
import { SidbanMoviesContext } from '../context/SidbanMoviesContext';
import SearchInput from './SearchInput';
import { GiFilmSpool } from 'react-icons/gi';
export default function SidbanSearch() {
    const{openSearch,setOpenSearch,setSearch,setSearchResult}=useContext(SidbanMoviesContext);

    function handleOnCloseSidbanSearch(){
         setSearch("");
        setSearchResult([]);
        setOpenSearch(false);
      
    }
   
  return (
    <div className={openSearch?'sidbanSearchDiv':'closeSidbanSearchDiv'}>
      <div className='searchHead'>
          <div className='shead1'>
         <h2>Sid<span className='banText'>ban</span>Cinema<GiFilmSpool style={{color:"red",fontSize:"2rem"}}/> </h2>
         </div>
         <div className='shead2'>
       <IoClose className='searchCloseIcon' onClick={handleOnCloseSidbanSearch}/>
       </div>
      </div>
      <div className='searchMovisesDiv'>
       <SearchInput/>
      </div>
    </div>
  )
}
