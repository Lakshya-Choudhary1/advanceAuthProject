import mongoose from "mongoose";
      
mongoose.connection.once('open',()=>{
     console.log("MONGOOSE IS SUCCESSFULLY CONNECTED!....")
})

mongoose.connection.on('error',()=>{
     console.log("MONGOOSE ERROR!.....")
})

const connectDB = async(MONGO_URI) =>{
     try{
           await mongoose.connect(MONGO_URI)
     }catch(error){
          console.log("MONGO ERROR : " , error.message);
     }
}

export default connectDB;