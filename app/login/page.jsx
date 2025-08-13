"use client"
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const LoginPage = () => {
     const [email,setEmail]=useState("")
        const [password ,setPassword]=useState("")
    
        const router = useRouter()

        const handleSubmit = async (e)=>{
            e.preventDefault();

            const result = await signIn("credentials",{
                email,password,redirect:false
            })

            if (result?.error) {
                console.log(result.error)
            }
            else{
                router.push("/")
            }
        }
    
  return (
    <div>
     <h1>Login</h1>
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
      
      <button type='submit'>Login</button>
     </form>
      <div>
      <p>
       don't have an account ? <a href='/register'>signup</a>
      </p>
     </div>

    </div>
  )
}

export default LoginPage
