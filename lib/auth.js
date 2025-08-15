import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { connectDb } from "./db"
import User from "@/models/user"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }
        try {
          await connectDb()
          const user = await User.findOne({ email: credentials.email })
          if (!user) throw new Error("User not found")
            console.log({
  enteredPassword: credentials.password,
  storedPassword: user.password
});


          // const isValid = await bcrypt.compare(credentials.password, user.password)
          // if (!isValid) throw new Error("Invalid password")

          return { id: user._id.toString(), email: user.email }
        } catch (error) {
          throw error
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id // ✅ matches authorize return
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET
}
