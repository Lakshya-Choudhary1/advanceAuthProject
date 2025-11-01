import express from "express";
import cors from "cors";
import helmet from "helmet"
import routes from "./routes/routes.js";


const app = express();
const whitelist_urls = ['https://localhost:3000','http://localhost:3000']

//middleware
app.use(helmet());
app.use(cors({
     origin : (origin,callback) =>{
          if(!origin || whitelist_urls.includes(origin)){
               callback(null,true)
          }else{
               callback(new Error("URL ORIGIN NOT ALLOWED : CORS ERROR"))
          }
     }
}))

//routes
app.use("/api",routes)

app.get("/",(req,res)=>{
     return res.status(200).send("<h1>SUCCESS</h1>");
})

export default app;