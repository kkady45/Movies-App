import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import Movies from '../Movies/Movies'
import { Link } from 'react-router-dom';
import { storeContext } from '../Store/Store';


export default function Layout(props) {
  let data=useContext(storeContext);
    
  return (
   <>
   
   <Navbar userName={props.userName} isLogin={props.isLogin} setIsLogin={props.setIsLogin}/>
   <div className="container margo">     

    {data.searchMovie.length==0? 
  <Outlet/>
    :
    <div className="row">
      {data.searchMovie.map((movie)=>{
        return <div className="col-lg-2">
          <div className="position-relative">
          <Link to={`/movieDetails/${movie.id}`}><img className='w-100' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" /></Link>
            <p>{movie.title}</p>
            <div className='position-absolute top-0 end-0 p-2 bg-info'>{movie.vote_average.toFixed(1)}</div>

          </div>
        </div>
       
      })}
    </div>
    } 
     
    </div>   
   </>
  )
}



  

  




  












