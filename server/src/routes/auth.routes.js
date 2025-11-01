import{Router} from "express"

const authRoute = Router();

authRoute.get('/',(req,res)=>{
     res.send('<h1>https://localhost:3000/api/auth/</h1>')
})


export default authRoute;