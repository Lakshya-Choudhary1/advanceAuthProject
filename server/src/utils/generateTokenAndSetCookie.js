import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (res,userId) => {
     const token = jwt.sign({userId},process.env.JWT_SECRET ,{
          expiresIn : '7d'
     });

     res.cookie('token',token,{
          httpOnly: true, //cookie cannot be accessed from client side js
          secure: process.env.NODE_ENV === 'production',//https
          maxAge: 7*24*60*60*1000,
          sameSite:"lax"
     })

     return token;
}

export default generateTokenAndSetCookie;