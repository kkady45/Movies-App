import axios from 'axios';
import Joi from 'joi'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../Store/Store';




export default function Login(props) {

  let testl=useContext(storeContext);


  const[user,setUser]=useState({
    email:"",
    password:""

  })
  let copyUser={...user}

  const[validationMsg,setValidationMsg]=useState([]);
  let copyValidationMsg=[...validationMsg];

  const[backMsg,setBackMsg]=useState('')

  let navigateTo=useNavigate();


  function validation(){
    let rules=Joi.object({
      
        email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
        password:Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    
    

    })
   let result= rules.validate(user,{abortEarly:false})
   if(result.error!=undefined){
    copyValidationMsg=result.error.details;
    setValidationMsg(copyValidationMsg);
    return false;
   }
   else{
    setValidationMsg([])
    return true;
   }
  }

  function showEachError(err){
   return  validationMsg.map((obj)=>{
      if(obj.message.includes(err)){
      return <p className='text-danger'>{obj.message}</p>
      }
    })

  }
 
  async function Login(){
    if(validation()){
      
    let{data}=await axios.post('https://movies-api.routemisr.com/signin',user);
    console.log(data);
    if(data.message=='success'){
    // setBackMsg(data.message);
    navigateTo('/home')
    localStorage.setItem('token',data.token)
    console.log(props);
    console.log(props.setIslogin);
    props.setIslogin(true)
    
      }
      else{
        
        setBackMsg(data.message)
      }
    }
}


  



  return (
    <>
    
    
     <div className='d-flex justify-content-center align-items-center vh-100'>
    <div className="container">
   <div className=''>
   <h1>Login Form</h1>
   <form onSubmit={(e)=>{
    e.preventDefault();
    Login();

   }}>
   <div className='mb-2'>     
       <label htmlFor="firstName" className='mb-1'>Email:</label>
      <input onChange={(e)=>{
        copyUser.email=e.target.value;
        setUser(copyUser);
        console.log(user);
      }} className='form-control from' type="text" name="" id="email" />
      </div>
      {validationMsg.length>0?showEachError('email') :<></>}
   <div className='mb-2'>     
       <label htmlFor="password" className='mb-1'>Password:</label>
      <input  onChange={(e)=>{
        copyUser.password=e.target.value;
        setUser(copyUser);
        console.log(user);
      }} className='form-control from' type="text" name="" id="password" />
      </div>
      {validationMsg.length>0?showEachError('password') :<></>}
      <button className='btn btn-info '>Login</button>
   </form>
   <p className='text-danger'>{backMsg}</p>
   

   </div>
   </div>

   
   </div>
    </>
  
  )
}
