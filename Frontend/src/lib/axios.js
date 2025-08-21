import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://chat-application-1-nm31.onrender.com/api" ,
   // baseURL:"http://localhost:5001/api" ,
    withCredentials : true , 
    
})