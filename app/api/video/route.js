import { authOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import Video from "@/models/video";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function GET() 
{
    try {
        await connectDb()
       const video= await Video.find({}).sort({createdAt:-1}).lean()
       if (!video || video.length===0) {
        return   NextResponse.json({ msg: "videos not found" }, { status: 400 });

       }
       return NextResponse.json(video)


    } catch (error) {
        return NextResponse.json(
            {
            error:'failed to fetch videos'
        })
    }
    
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json(
                {
                    error:"unauthorised"
                }
            )
        }

        await connectDb()
      const body =  await request.json()

      if (!body.title ||
          !body.videoUrl
      ) {
        return NextResponse.json({error:'missing required fields'})
      }

      const videoData ={
        ...body,
        controls:body?.controls ?? true,
        transformation:{
            height:1920,
            width:1080,
            quality:body.transformation?.quality ?? 100
        }
      }

    const newVideo =  await Video.create(videoData)

      return NextResponse.json(newVideo)

    } catch (error) {
        
    }
    
}


