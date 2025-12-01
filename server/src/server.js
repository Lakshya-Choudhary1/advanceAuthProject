import https from "https";
import http from "http"
import fs from "fs";
import { dirname ,join} from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import app from "./app.js"
import connectDB from "./database/connectDB.js"

dotenv.config();

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;
// const server = http.createServer(app);
const server = https.createServer({
     cert: fs.readFileSync(join(_dirname,"..",'..','/cert.pem')),
     key: fs.readFileSync(join(_dirname,"..",'..','/key.pem'))
},app)

const startServer = async () =>{
     await connectDB(MONGO_URI);
     server.listen(PORT,()=>{
     console.log(`SERVER IS LISTENING ON PORT : ${PORT}......`);
     })
}

startServer();
