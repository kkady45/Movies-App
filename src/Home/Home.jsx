import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Movies from '../Movies/Movies'
import { Link } from 'react-router-dom';
import { storeContext } from '../Store/Store';

export default function Home() {

  let data=useContext(storeContext);

  const[moviesData,setMoviesData]=useState([]);
  let copyMoviesData=[...moviesData]
  const[tvData,setTvData]=useState([]);
  let copyTvData=[...tvData]
  const[personData,setPersonData]=useState([]);
  let copyPersonData=[...personData]

  const[searchMovies,setSearchMovies]=useState([]);


 async function getData(category,setData){

  let{data}=await axios.get(`https://api.themoviedb.org/3/trending/${category}/day?api_key=a094bd460be88d7a171b786fa78bfd56`);
  let response=data.results;
  setData(response)
  
  }
  useEffect(()=>{
   getData('movie',setMoviesData);
   getData('tv',setTvData)
   getData('person',setPersonData)
   setSearchMovies(data.searchMovie)
   console.log(searchMovies.length);
  },[searchMovies])
 

  
  return (
    <>
    <div className="container margo">     

    {data.searchMovie.length==0? 
    <div className="row">
      <div className='col-lg-4'>
       <div className="">
        <h1>
        Trending <br/> Movies <br /> to watch now
        </h1>
        </div>
        </div>

      {moviesData.slice(0,10).map((movie)=>{
        return <div key={movie.id} className="col-lg-2">
          <div className="position-relative">
          <Link to={`/movieDetails/${movie.id}`}><img className='w-100' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" /></Link>
            <p>{movie.title}</p>
            <div className='position-absolute top-0 end-0 p-2 bg-info'>{movie.vote_average.toFixed(1)}</div>

          </div>
        </div>
       
      })}
      <div className='col-lg-4'>
       <div className="">
        <h1>
        Trending <br/> Tv <br /> to watch now
        </h1>
        </div>
        </div>

      {tvData.slice(0,10).map((tv)=>{
        return <div key={tv.id} className="col-lg-2">
          <div className="position-relative">
                     <Link to={`/tvDetails/${tv.id}`}> <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="" /></Link>
            <p>{tv.name}</p>
            <div className='position-absolute top-0 end-0 p-2 bg-info'>{tv.vote_average.toFixed(1)}</div>
            <p>{tv.id}</p>

          </div>
        </div>
       
      })}
      <div className='col-lg-4'>
       <div className="">
        <h1>
        Trending <br/> Person <br /> to watch now
        </h1>
        </div>
        </div>

      {personData.slice(0,10).map((person)=>{
        return <div key={person.id} className="col-lg-2">
          <div className="position-relative">
           <Link to={`/personDetails/${person.id}`}> <img  className='w-100' src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt="" /></Link>
            <p>{person.name}</p>
            <div className='position-absolute top-0 end-0 p-2 bg-info'>{person.known_for[1].vote_average.toFixed(1)}</div>

          </div>
        </div>
       
      })}
     
    </div>
    :
    <div className="row">
      {data.searchMovie.map((movie)=>{
        return <div key={movie.id} className="col-lg-2">
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
