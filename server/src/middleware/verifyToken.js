import jwt from "jsonwebtoken";
//verifyToken function

export const verifyToken = (req,res,next) =>{
     const token = req.cookies.token;
      if(!token){
          return res.status(201).json({
               success:false,
               message:"NO TOKEN / UNAUTHORISED "
          })
     }
    try{
          const decode = jwt.verify(token,process.env.JWT_SECRET);

          if(!decode){
               return res.status(201).json({
                    success:false,
                    message:"INVALID TOKEN / UNAUTHORISED "
               })
          }

          req.userId = decode.userId
          next();
    }catch(error){
         return res.status(401).json({
                    success:false,
                    message:"middleware error"+error.message
               })
    }
}