//simple goal is k files meray paas, files system k through aaye ge 
//i.e server par upload hogaye hai server say ab local path dongay and we will upload that on cloudinary   
//file remove karna => ?
//v2 as cloudinary => here cloudinary is the name in the curly bracket of the variable which contains cloudinary package
//unlink => delete karna file system say 
//link => upload karna 

import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//localFilePath mai isko donga aur it wil upload the file on cloudinary and 
//will give some response back
const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"//upload option  here auto means k wo khud detect karay ga
        })
        //file has been uploaded successfully 
        console.log("File is uploaded on cloudinary",response.url);
        return response;
    
    }catch(error){
        fs.unlinkSync(localFilePath)//remove the locally svaed temporary file as 
        //upload operation got failed
    }
}

export {uploadOnCloudinary}