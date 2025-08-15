"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({onSuccess,onProgress,fileType}) => {
   const [uploading , setUploading]= useState(false)
   const [error,setError]=useState(null)

    const validateFile = (file)=>{
            if (fileType==="video"  ) {
                if(!file.type.startWith("video/")){
                   setError ("please upload a valid video file")
                }
            }
    }

    const handleFileChange= async(e)=>{
        const file = e.target.file?.[0]

        if(!file || !validateFile(file))return

        setUploading(true)
        try {
          const authres=  await fetch("/api/auth/imagekit-auth")
          const auth = await authres.json()

        const res=  await upload({ 
                expire:auth.expire,
                token:auth.token,
                signature:auth.signature,
                publicKey:process.env.NEXT_PUBLIC_PUBLIC_KEY,
                file,
                fileName: file.name, 
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded/event.total)*100
                        onProgress(Math.round(percent))
                    }
                },

          })
              onSuccess(res) 


        } catch (error) {
            console.error(error)
        }finally{
            setUploading(false)
        }
       

    }


    return (
        <>
            {/* File input element using React ref */}
            <input type="file"
            accept={fileType==="video"?"video/*":"image/*"}
            onChange={handleFileChange}
            />
            {uploading &&
            <span>loading</span>
            }
            
        </>
    );
};

export default FileUpload;