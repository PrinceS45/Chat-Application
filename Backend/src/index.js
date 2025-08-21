import express from "express" ; 
import authRoutes from "./Routes/auth.route.js" ; 
import messageRoutes from "./Routes/message.route.js" ; 
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv" ;
import cookieParser from "cookie-parser";
import cors from 'cors' ; 
import{app , server} from "./lib/socket.js"
dotenv.config() ;

const PORT = process.env.PORT || 5001 ;

app.use(cors({
    origin:[ "https://chat-application-two-ecru.vercel.app" , "http://localhost:5173"],
    credentials: true,
}));



app.use(cookieParser()) ; 
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth" , authRoutes) ; 
app.use("/api/messages" , messageRoutes) ; 


server.listen(5001 , ()=> {
    console.log("Server is running on port 5001 ") ; 
    connectDB() ; 
}) ; 