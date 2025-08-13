import mongoose from "mongoose"

const mongourl = process.env.MONGODB_URL
if (!mongourl) {
    throw new Error("define mongoUrl")
    
}


let cached = global.mongoose
if (!cached) {
   cached = global.mongoose = { con: null, promise: null };
    
}

export async function connectDb() {
    if (cached.con) {
        return cached.con
        
    }
   if (!cached.promise) {
  cached.promise = mongoose.connect(mongourl).then(() => mongoose.connection);
}


    try {
       cached.con =await cached.promise
    } catch (error) {
        cached.promise=null
        throw error
        
    }
    return cached.con
    
}