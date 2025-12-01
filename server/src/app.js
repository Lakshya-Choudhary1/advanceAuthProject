import express, { urlencoded ,json} from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import helmet from "helmet"
import routes from "./routes/routes.js";

import {dirname,join} from "path";
import {fileURLToPath} from "url"


const app = express();
const whitelist_urls = process.env.WHITELIST_URLS

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

//middleware
app.use(json()); //parser incoming json data
app.use(urlencoded({extended:true})); //parser incoming form data
app.use(cookieParser()); // parser incoming cookie through request
app.use(helmet()); //secure request headers
app.use(cors({
     origin : (origin,callback) =>{
          if(!origin || whitelist_urls.includes(origin)){
               callback(null,true)
          }else{
               callback(new Error("URL ORIGIN NOT ALLOWED : CORS ERROR"))
          }
     },credentials:true
}))
app.use(express.static(join(_dirname, "..", "public")));


app.use("/api", routes);


app.get("/", (req, res) => {
  res.sendFile(join(_dirname, "..", "public", "index.html"));
});

export default app;