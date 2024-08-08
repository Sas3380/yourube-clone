import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }//isse tarah middleware inject kartay hai
    ]),//fields accept array
    registerUser
)
//faida kia howa isse?
//ache practice e hai agar aap api define kar rahay 
//aur iska version tho batayeay
export default router