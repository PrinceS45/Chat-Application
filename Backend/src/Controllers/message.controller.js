import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import cloudinary from "../lib/cloudinary.js";


export const getUserForSidebar = async (req , res) => {
    try {
        const loggedInUserId = req.user._id ; 
        const filteredUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password") ; 

        res.status(200).json(filteredUsers) ; 

    } catch (error) {
        console.log("Error in getUsersForSidebar" , error.message) ; 
        return res.status(500).json({error : "internal Server Error"}) ; 
    }
}

export const getMessages = async (req , res) => {
    try {
       const {id : userToChatId} =req.params ; 
     
       const myId = req.user._id ; 

       const messages = await Message.find({
        $or : [
            {senderId : myId , receiverId : userToChatId} ,
            {
                senderId : userToChatId , receiverId : myId 
            } 
        ]
       })

       res.status(200).json(messages) ; 


    } catch (error) {
        console.log("Error in getMassesages controller  :" , error.message) ; 

        res.status(500).json({error : "Internal Server error"}) ; 
    }
}

export const sendMessage = async (req ,res) => {
   try {
    const {text , image} = req.body ; 
    const {id :  receiverId } = req.params ; 
    let imageUrl ; 
    if(image) {
        // upload it to cloudinary 
        const uploadResponse = await cloudinary.uploader.upload(image) ; 
        imageUrl = uploadResponse.secure_url  ; 
    }
    const newMessage = new Message({
        senderId , 
        receiverId , 
        text , 
        image : imageUrl , 
    }) ; 
    await newMessage.save() ; 
    // todo : realtime fnlity with socket io 

    res.status(201).json(newMessage) ; 

   } catch (error) {
    console.log("Error in sendMessage controller : " , error.message) ; 
    res.status(500).json({error : "internal server error "}) ; 
   } 
}