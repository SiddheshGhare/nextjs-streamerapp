import { connectDb } from "@/lib/db";
import User from "@/models/user";
import { NextRequest,NextResponse } from "next/server";

export async function Post(request) {
    try {
       const {email,password}= await request.json()
       if (!email || !password) {
        return NextResponse.json({error:"email and assword required"},{status:400})

       }

       await connectDb()

     const existingUser=  await User.findOne({email})
     if (existingUser) {
         return NextResponse.json({error:"already registered"},{status:400})
     }
      
     const user=await User.create({
        email,password
     })

     return NextResponse.json({user:user,mes:"user registered "},{status:400})

    } catch (error) {
         return NextResponse.json({error:"failed"},{status:400})
        
    }
    
}