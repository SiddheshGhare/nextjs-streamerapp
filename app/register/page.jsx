"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [email,setEmail]=useState()
    const [password ,setPassword]=useState()
    const [confirmPassword ,setConfirmPassword]=useState()

    const router = useRouter()

    const handleSubmit= async (e)=>{
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("password do not match")
        return
      }
      try {
        const res = await fetch("/api/auth/register",
          {
            method:"POST",
            headers:{
              "content-type":"Application/json"
            },
            body:JSON.stringify({email,password})
          }
        )

        const data = res.json()
        if (!res.ok) {
          throw new Error(data.error || "regestration failed")
        }

        router.push("/login")
      } catch (error) {
        console.log(error);
        
      }

    }
  return (
    <div>
     <h1>Register</h1>
     <form onSubmit={handleSubmit}>
      <input type="text"
              placeholder='Email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
      />
      <input type="password"
              placeholder='Password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
      />
      <input type="password"
              placeholder='Confirm Password'
              value={password}
              onChange={(e)=> setConfirmPassword(e.target.value)}
      />
      <button type='submit'>register</button>
     </form>

     <div>
      <p>
        already have an account ? <a href='/login'>Login</a>
      </p>
     </div>
    </div>
  )
}

export default page
