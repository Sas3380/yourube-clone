import multer from "multer";

//cb => means callback
const storage = multer.diskStorage({
    destination: function (req, file, cb) {//e file multer ki paas hota hai 
      cb(null, './public/temp')//I will keep all files in public folder that we can easily access them
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage })
//we will use this as a middleware
//middleware is in between the routes and controllers