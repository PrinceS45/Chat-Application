import mongoose from "mongoose" ; 
import dotenv from "dotenv" ;

export const connectDB = async() => {
    try {
         await mongoose.connect(process.env.MONGODB_URL ).then(
            () => console.log("MongoDb connected successfully") 
         )
    } catch (error) {
        console.log("Error connecting to MongoDb" , error )  ; 
    }
}