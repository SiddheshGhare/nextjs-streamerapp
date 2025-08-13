import bcrypt from "bcrypt"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { connectDb } from "./db"
import User from "@/models/user"

export const authOptions={
    providers: [
   CredentialProvider({
    name:"Credentials",
    Credentials:{
      email:{label:'Email' ,type:"text"},
      password:{labes:'Password',type:"password"}
    },

    async authorize(credentials){
      if (!credentials.email || !credentials.password) {
        throw new Error ("missing email or password")
      }
      try {
        await connectDb()
       const user= await User.findOne({email:credentials.email})

       if (!user) {
        throw new Error("user not found")
       }
       const isValid = await bcrypt.compare(credentials.password,user.password)
       if (!isValid) {
        throw new Error("invaid password")
       }
       return{
        id:user._id.toString(),
        email:user.email
       }


      } catch (error) {
        throw error
      }

    },
    
   })
  ],
  callbacks:{
    async jwt({token,user}){
      if (user) {
        token.id=user._id
        
      }
      return token
    },
    async session({session,token}){
      if (session.user) {
       session.user.id= token.id
        
      }
      return session
    },

  },
  pages:{
    signIn:"/login",
    error:"/login"
  },
  session:{
    strategy:"jwt",
    maxAge:30*24*60*60,

  },
  secret:process.env.NEXTAUTH_SECRET,

}