import logo from './logo.svg';
import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import Movies from './Movies/Movies';
import Tv from './Tv/Tv';
import People from './People/People';
import Network from './Network/Network';
import About from './About/About';
import MovieDetails from './MovieDetails/MovieDetails';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import TvDetails from './TvDetails/TvDetails'
import PersonDetails from './PersonDetails/PersonDetails'
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


function App() {

  
  const[isLogin,setIsLogin]=useState(false);
  const[userName,setUserName]=useState('')
  const routes=createBrowserRouter([{path:'',element:<Layout userName={userName} setIsLogin={setIsLogin} isLogin={isLogin}/>,children:[
    {index:true,element:<Register/>},
    {path:'*',element:<div>Error </div>},
    {path:'movieDetails/:movieId',element:<ProtectedRoute><MovieDetails/></ProtectedRoute>},
    {path:'tvDetails/:tvId',element:<ProtectedRoute><TvDetails/></ProtectedRoute>},
    {path:'personDetails/:personId',element:<ProtectedRoute><PersonDetails/></ProtectedRoute> },
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'movies',element:<ProtectedRoute><Movies/></ProtectedRoute>},
    {path:'tv',element:<ProtectedRoute><Tv/></ProtectedRoute>},
    {path:'people',element:<ProtectedRoute><People/></ProtectedRoute>}, 
    {path:'login',element:<Login setIslogin={setIsLogin}/>}, 
  ]}])


  useEffect(()=>{

    if(localStorage.getItem('token')){
     let data= jwtDecode(localStorage.getItem('token'));
     setIsLogin(true)
     console.log(data);
     setUserName(data.first_name)

    }
  },[isLogin])
  
  return (
   <>
   <RouterProvider router={routes}/>

   
   
   </>
  );
}

export default App;
