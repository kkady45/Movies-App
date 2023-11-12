import { createContext, useState } from "react";
import axios from "axios";

export let storeContext=createContext(0);

export default function StoreProvider(props){

    let [searchMovie,setSearchMovie]=useState([]);
    async function getBySearch(movie){
      let {data}=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a094bd460be88d7a171b786fa78bfd56&query=${movie}`);
      setSearchMovie(data.results)
    }
    return(
        <storeContext.Provider value={{searchMovie,getBySearch,setSearchMovie}}>
            {props.children}
        </storeContext.Provider>
    )
}