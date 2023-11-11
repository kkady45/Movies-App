import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Tv() {
  let testo1=document.getElementById('testo1')
  let testo2=document.getElementById('testo2')
  let testo3=document.getElementById('testo3')
  const[moviesData,setMoviesData]=useState([]);
  let copyMoviesData=[...moviesData]
  let numOfPages=1000
  function next(){
   
    let x=Number(testo1.innerHTML)
    console.log(x);
    if(x<numOfPages-2){
    testo1.innerText= x+=3
    getData('movie',setMoviesData,x++)
    }
    
    let y=Number(testo2.innerHTML)
    if(y<numOfPages-1){
    testo2.innerText= y+=3
    }

    let z=Number(testo3.innerHTML)
    if(z<numOfPages){
    testo3.innerText= z+=3
    
    }

  }
  function previous(){
    let x=Number(testo1.innerHTML)
    console.log(x);
    if(x>1){
    testo1.innerText= x-=3
    }
    
    let y=Number(testo2.innerHTML)
    if(y>2){
    testo2.innerText= y-=3
    }

    let z=Number(testo3.innerHTML)
    if(z>3){
    testo3.innerText= z-=3
    getData('movie',setMoviesData,z--)
    }


  }

  




 async function getData(category,setData,page){

  let{data}=await axios.get(`https://api.themoviedb.org/3/trending/${category}/day?api_key=a094bd460be88d7a171b786fa78bfd56&page=${page}`);
  let response=data.results;
  let numo=data.total_pages;
  setData(response)
  console.log(numo);
  numOfPages=numo;
  
  
  }
  useEffect(()=>{
   getData('tv',setMoviesData,1);
   
  },[])

  return (
    <>
       <div className="container margo">
    <div className="row">

      {moviesData.map((movie)=>{
        return <div key={movie.id} className="col-lg-2">
          <div className="position-relative">
            <Link to={`/tvDetails/${movie.id}`}><img className='w-100' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" /></Link>
            <p>{movie.title}</p>
            <div className='position-absolute top-0 end-0 p-2 bg-info'>{movie.vote_average.toFixed(1)}</div>

          </div>
        </div>
       
      })}
    </div>
    <div className='d-flex justify-content-center'>

      <div onClick={previous} className='me-3'>p</div>
      <div onClick={(e)=>{
        getData('movie',setMoviesData,e.target.innerText)
      }} id='testo1' className='me-3'>1</div>
      <div onClick={(e)=>{
        getData('movie',setMoviesData,e.target.innerText)
      }} id='testo2' className='me-3'>2</div>
      <div onClick={(e)=>{
        getData('movie',setMoviesData,e.target.innerText)
      }} id='testo3' className='me-3'>3</div>
      <div onClick={next} className='me-3'>n</div>
      
      </div>
    </div>

    
    
    </>
  )
}

