import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();//app name is common 

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}));//accept json
app.use(express.urlencoded({extended: true, limit: "16kb"}))//extended true means u can give objects nestted objects
app.use(express.static("public"))//public assets
app.use(cookieParser());




//routes import karna idhar
//cuz we do this in case of routes
import userRouter from "./routes/user.routes.js";

//usage?
//routes declarations:
app.use("/api/v1/users",userRouter);//we give control to user router 
//userRouter , user.router file mai jayega 
//kahe ga k mai control aap ko paas kar raha ho mujhe bataye k kia karna hai
//here /users become prefix

//http://localhost:8000/api/v1/users/register
//jese aap /users pay gaye controll jaeyga direct user.routes par 
//yaha pa kuch change nahi aaeyga 
//user ka bad jitnay bhi methods likhay jaeyngay wo user.route mai   
export {app}

// /api/v1/users => good practice
