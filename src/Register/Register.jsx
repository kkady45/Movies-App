import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'




export default function Register() {
  const[user,setUser]=useState({
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    password:'',
  })

  let copyUser={...user}
  useEffect(()=>{
    if(user!={
      first_name:'',
      last_name:'',
      age:'',
      email:'',
      password:'',
    }){
      console.log(user);
    }
  },[user])

  const[msg,setMsg]=useState([]);

  let copyMsg=[...msg];

  const[errMsg,setErrMsg]=useState([]);
  let copyErrMsg=[...errMsg];

  async function register(){
    if(validation()){
    let {data}=await axios.post('https://movies-api.routemisr.com/signup',user);
    if(data.message=='success'){
      navigateTo('/login')

    }
    else{
      setErrMsg(data.errors.email.message)
    }
  }
  }

  function validation(){
    let rules=Joi.object({
      
        first_name:Joi.string().min(3).required(),
        last_name:Joi.string().min(3).required(),
        age:Joi.number().min(16).max(100).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password:Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    let result=rules.validate(user,{abortEarly:false});
    if(result.error!=undefined){
      copyMsg=result.error.details
      console.log(copyMsg);
      setMsg(copyMsg)
      return false;
    
    }
    else{
      setMsg([]);
      return true;
    }
    
  }

  function showEachError(obj){
   return msg.map((error)=>{
      if(error.message.includes(obj)){
        return( 
          <>
          {console.log(error.message)}
        <p className='text-danger'>{error.message}</p>
        </>
        )
      }
    })


  }

  let navigateTo=useNavigate();

  
  return (
    <>
    <div className="container mt-3">
    <h1>Registeration Form</h1>
    
    <form onSubmit={
      (e)=>{
        e.preventDefault();
        register();
      }
    }>
      <div className='mb-2'>     
       <label htmlFor="firstName" className='mb-1'>First Name:</label>
      <input onChange={(e)=>{
        copyUser.first_name=e.target.value;
        setUser(copyUser)

      }} className='form-control from' type="text" name="" id="first_Name" />
      </div>
     {msg.length>0?showEachError('first_name'):<></>}
      <div className='mb-2'>     
       <label htmlFor="lastName" className='mb-1'>Last Name:</label>
      <input onChange={(e)=>{
        copyUser.last_name=e.target.value;
        setUser(copyUser)

      }} className='form-control from' type="text" name="" id="lastName" />
      </div>
      {msg.length>0?showEachError('last_name'):<></>}

      <div className='mb-2'>     
       <label htmlFor="age" className='mb-1'>Age:</label>
      <input onChange={(e)=>{
        copyUser.age=e.target.value;
        setUser(copyUser)

      }} className='form-control from' type="text" name="" id="age" />
      </div>
      {msg.length>0?showEachError('age'):<></>}

      <div className='mb-2'>     
       <label htmlFor="email" className='mb-1'>Email:</label>
      <input onChange={(e)=>{
        copyUser.email=e.target.value;
        setUser(copyUser)

      }} className='form-control from' type="text" name="" id="email" />
      </div>
      {msg.length>0?showEachError('email'):<></>}

      <div className='mb-2'>     
       <label htmlFor="password" className='mb-1'>Password:</label>
      <input onChange={(e)=>{
        copyUser.password=e.target.value;
        setUser(copyUser)
        console.log(copyUser);

      }} className='form-control from' type="text" name="" id="password" />
      </div>
      {msg.length>0?showEachError('password'):<></>}

      <div className='mb-2'>     
     <button className='btn btn-info'>Regsiter</button>
      </div>

    </form>
    <p className='text-danger'>{errMsg}</p>
    
    </div>
    
    </>
  )
}
