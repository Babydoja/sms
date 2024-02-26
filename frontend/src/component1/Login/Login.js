import React, { useState } from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { Link, useNavigate}from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cookie, setCookie] = useCookies(['access_token'])
    const navigate=useNavigate()
    const submitForm=(e)=>{
        e.preventDefault()
        const studentdata={email,password}
        try {
           axios.post('http://localhost:6000//students/login',studentdata)
           .then((response)=>{
            if(response.status===200) {
              setCookie('access_token',response.data.token)
              window.localStorage.setItem('studentId',response.data.studentid)
              console.log(response.data);
              navigate('/dashboard')
           }
           }) 
           
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='contains'>
      
      <div>
        <form onSubmit={submitForm}>
        <h1>Login page</h1>
      
          <input type='email' placeholder='enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/> 
          <input type='password' placeholder='enter your password'onChange={(e)=>setPassword(e.target.value)} value={password}/>
          <li>Reset password</li>
          <button >Login</button>
          <p>---or---</p>
          <h3>Dont have an account?<span><Link to='/'>Register now</Link></span></h3>
        </form>
      </div>
    </div>
  )
}

export default Login