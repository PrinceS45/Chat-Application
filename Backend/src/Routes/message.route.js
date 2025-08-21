import express from "express" ; 
import { protectRoute } from "../Middleware/auth.middleware.js";
import { getUsersForSidebar , getMessages , sendMessage} from "../Controllers/message.controller.js";



const router = express.Router() ; 

router.get("/users" ,protectRoute , getUsersForSidebar ) ; 

router.get("/:id" , protectRoute , getMessages) ; 

router.post("/send/:id" , protectRoute , sendMessage) ; 


export default router ; 