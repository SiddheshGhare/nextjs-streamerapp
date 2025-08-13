import { Schema , model, models } from "mongoose"
import bcrypt from "bcrypt"

const videoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    controls:{
        type:Boolean,
        default:true
    },
     transformation:{
       height:{
        type:Number,
        default:VIDEO_DIMENSIONS.height
       },
        width:{
        type:Number,
        default:VIDEO_DIMENSIONS.width
       },
       quality:{
        type:Number,
        min:1,
        max:100
       }
    },
},{timestamps:true})

const Video=models?.Video || model('Video',videoSchema)
export default Video