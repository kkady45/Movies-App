import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

  // https://api.themoviedb.org/3/movie/507089?api_key=a094bd460be88d7a171b786fa78bfd56

  const[movieDetails,setMovieDetals]=useState({});
  const [movGeners,setMovGenres]=useState([])

  let{personId}=useParams();

 async function getMovieDetails(){
    let{data}=await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=a094bd460be88d7a171b786fa78bfd56`);
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
            <img className='w-100' src={`https://image.tmdb.org/t/p/w500/${movieDetails.profile_path}`} alt="" />
          </div>
        </div>
        <div className="col-lg-8 mt-5 text-white">
            <div className="p-3">
              <h2>{movieDetails.name}</h2>
              <h4 className=''>{movieDetails.known_for_department}</h4>
              <div className='d-flex '>
              </div>
                <p className='mt-4 fs-5'>{movieDetails.birthday}</p>
                <p className='mt-4 fs-5'>{movieDetails.place_of_birth}</p>
                <p className='mt-4 fs-5'>{movieDetails.biography}</p>

            </div>
          </div>
      </div>
    </div>
    
    </>
    
  )
}
