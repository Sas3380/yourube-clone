const asyncHandler =(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next (err))
    }
}





export {asyncHandler}
//higher order functions

// const asyncHandler =()=>()=>{}  or 
// const asyncHandler =()=>{()=>{}}
//instead of {} pass another arrow function like the above line

//MEHTOD 2
// const asyncHandler =(fn)=>async (req, res, next)=>{
//     try{
//         await fn(req,res,next);
//     }catch(error){
//         res.status(error.code || 500).json({
//             success:false,
//             message: error.message
//         }) //set the default here user will pass the error.code
//     }
// }