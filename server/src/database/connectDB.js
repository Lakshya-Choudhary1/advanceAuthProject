import mongoose from "mongoose";
      
mongoose.connection.once('open',()=>{
     console.log("MONGOOSE IS SUCCESSFULLY CONNECTED!....")
})

mongoose.connection.on('error',()=>{
     console.log("MONGOOSE ERROR!.....")
})

const connectDB = async(MONGO_URI) =>{
     try{
          const conn = await mongoose.connect(MONGO_URI)
          console.log("MONGO HOST : " , conn.connection.host);
     }catch(error){
          console.log("MONGO ERROR : " , error.message);
     }
}

export default connectDB;