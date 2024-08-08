//sab se pehla kaam kia karna hai 
//helper file asyncHandler like a wrapper 
//faida e hai k har koi cheez ko try catch mai nahi daala jai ga 

import { asyncHandler } from "./utils/asynchandlers.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"//e user aap k database say direct contact kar sakta hai
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//this is higher order function
const registerUser = asyncHandler(async(req,res)=>{//this is the wrapper
        //get use details from frontend through postman without frontend 
        //validation lagana parega is email correct etc
        //check if user already registered: username and email sai 
        //check for images, check for avatar 
        //upload them to cloudinary, avatar check karna 
        //create user object --create entry in db
        //remove password and refresh token field from response
        //check for user creation
        //return response

        const {fullname,email,username,password} = req.body;
        console.log("email:", email);

        // if(fullname ===""){
        //     throw new ApiError(400, "fullname is required");
        // }
        if(//form validation
            [fullname, email, username, password].some((fields)=>
            fields?.trim()==="")
            //aik bhi field nay agar true return kia tho matlub wo khali hai
            //this code checks if any of the provided variables are either undefined, null or contain only whitespace
            //some()=> checks whther at least one element in the array passes the test implemented by the functin the cb
            // trim()=> removes whitespace from both ends of the string
        ){
            throw new ApiError(400, "All fields are required");
        }

        //3
        const existedUser = User.findOne({
            $or:[{ username }, { email }]
        })//ya email mel jaye ya username. Agar user already hai tho agay proceed nahi karna hai but error throw karna hai direct
 
        if(existedUser){
            throw new ApiError(409,"User with email or username already exists")
        }

        //4
        const avatarLocalPath = req.files?.avatar[0]?.path;  //to get the path 
        const coverImageLocalPath = req.files?.coverImage[0]?.path;
        if(!avatarLocalPath){
            throw new ApiError(400,"Avatar file is required");
        }
        //these line extract file paths from the request obejct
        //req.files => this object contains all files uploaded in a request 
        //?. => optional chaining 
        //if req.files, req.files.avatar, or req.files.avatar[0] is null or undefined, the expression short-circuits and returns undefined instead of throwing an error.
        //[0] => means accessing the first file

        //5
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        //6
        if(!avatar){
            throw new ApiError(500, "avatar is required");
        }

        //7
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage:  coverImage?.url || "",//agar coverimage ho tho us mai sai url nikaal lo but agar nahi hai tho empty rehnay do usse
            email,
            password,
            username: username.toLowerCase() 
        })

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )//agar user successfully create hua tho e kuch reposne dega

        if(!createdUser){
            throw new ApiError(500, "Something went wring while registering the user");
        }


        //8
        return res.status(201).json(
            new ApiResponse(200,createdUser, "User registerd successfully")
        )

    })  

export { registerUser };//this will make this function accessible to other files in the project



// Trim each field and check if it is empty
// if ((fullname && fullname.trim() === "") || 
//     (email && email.trim() === "") || 
//     (username && username.trim() === "") || 
//     (password && password.trim() === "")) {
    
//     console.log("There is at least one empty field.");
// } else {
//     console.log("All fields are filled.");
// }