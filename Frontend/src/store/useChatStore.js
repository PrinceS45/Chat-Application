
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set , get)=> ({
 messages : [] , 
 users : [] , 
 selectedUser :  null , 
 isUserLoading : false , 
 iseMessagesLoading : false , 

 getUsers : async () => {
    set({isUserLoading : true}) ; 
    try {
        const res = await axiosInstance.get("/messages/users")  ; 
        set({users : res.data}) ; 
    } catch (error) {
        toast.error(error.response.data.messages) ; 
    }
    finally {
        set({isUserLoading : false}) ; 
    }
 } ,

 getMessages : async(userId) => {
       set({iseMessagesLoading : true}) ; 
       try {
         const res = await axiosInstance.get(`/messages/${userId}`) ; 
         set({messages : res.data}) ; 

       } catch (error) {
         toast.error(error.response.data.messages) ; 
       }
       finally{
        set({iseMessagesLoading : false}) ; 
       }
 } , 
 

 sendMessage : async(messageData) => {
     const {selectedUser , message}  = get() ; 
     try {
        const res = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageData) ; 

        set({message : [...message , res.data]}) ; 
     } catch (error) {
        toast.error(error.response.data.message) ; 
     }
 } , 

 setSelectedUser : (selectedUser) => set({selectedUser}) , 
 // todo:optmisation this one later 


} ))
