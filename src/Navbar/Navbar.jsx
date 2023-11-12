import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { storeContext } from '../Store/Store';
export default function Navbar(props) {

  let navigateTo=useNavigate();

 
  useEffect(()=>{
    
  },[])

  let data=useContext(storeContext);

  return (
    <>

  <nav className="navbar navbar-expand-lg navbar-dark navo fixed-top">
    <div className="container-fluid">
     {props.isLogin?<a className="navbar-brand" href="#">{props.userName}</a>:<></>} 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {  props.isLogin ?
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink aria-current="page" to='home' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink aria-current="page" to='movies' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger" : isPending ? "pending" : "nav nav-link";
                }}>Movies</NavLink>
          </li>
          <li className="nav-item">
            <NavLink aria-current="page" to='tv' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger text-black" : isPending ? "pending" : "nav nav-link";
                }}>Tv Show</NavLink>
          </li>
          <li className="nav-item">
            <NavLink aria-current="page" to='people' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger text-black" : isPending ? "pending" : "nav nav-link";
                }}>People</NavLink>
          </li>
          
       
      
         
         
        </ul> :<></>}
    
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

          {props.isLogin?  
            <li className='nav-item'>
            <input onChange={(e)=>{
              data.getBySearch(e.target.value)   
            }} className= 'form-control' type="text" name="" id="" />

          </li>:<></>}
     
       
          {props.isLogin? <></>:
          <>
             <li className="nav-item">
            <NavLink aria-current="page" to='login' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger " : isPending ? "" : "nav nav-link";
                }}>Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink aria-current="page" to='' 
            style={({ isActive, isPending }) => {
                return {
                  color: isActive ? "" : "white",
                };
              }}
              className={({ isActive, isPending }) => {
                return isActive ? "nav-link active bg-danger" : isPending ? "pending" : "nav nav-link";
                }}>register</NavLink>
          </li>
         
          </>
          }
          {props.isLogin?  <li className="nav-item">
            <a onClick={(e)=>{
              e.preventDefault()
              console.log(props);
              navigateTo('/login');
              localStorage.removeItem('token');
              data.setSearchMovie([]);
              props.setIsLogin(false)
              console.log(props);

            }} className='text-decoration-none text-white nav-link btn btn-success ms-2' href="">Log Out</a>
          </li> :<></>}
         
          
      
        </ul>
       
      </div>
    </div>
  </nav>
    
    </>
  )
}
