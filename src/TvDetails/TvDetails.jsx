import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

  // https://api.themoviedb.org/3/movie/507089?api_key=a094bd460be88d7a171b786fa78bfd56

  const[movieDetails,setMovieDetals]=useState({});
  const [movGeners,setMovGenres]=useState([])

  let{tvId}=useParams();

 async function getMovieDetails(){
    let{data}=await axios.get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=a094bd460be88d7a171b786fa78bfd56`);
    console.log(data);
    setMovieDetals(data)
    setMovGenres(data.genres)
    console.log(data.genres);
  }
  useEffect(()=>{
    getMovieDetails();
  },[])

  return (
    <>
    <div className="container mt-3 ">
      <div className="row">
        <div className="col-lg-4">
          <div className="bg-danger">
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="" />
          </div>
        </div>
        <div className="col-lg-8 mt-5 text-white">
            <div className="p-3">
              <h2>{movieDetails.original_title}</h2>
              <h4 className=''>{movieDetails.tagline}</h4>
              <div className='d-flex '>
                 {movGeners.map((obj)=>{
                  return <p className='bg-info p-2 rounded me-2 mt-3'>{obj.name}</p>
                })} 
              </div>
                <p className='fs-5'>vote: {movieDetails.vote_average}</p>
                <p className='fs-5'>vote count: {movieDetails.vote_count}</p>
                <p className='fs-5'>popularity: {movieDetails.popularity}</p>
                <p className='fs-5'>release date: {movieDetails.release_date}</p>
                <p className='mt-4 fs-5'>{movieDetails.overview}</p>

            </div>
          </div>
      </div>
    </div>
    
    </>
    
  )
}
