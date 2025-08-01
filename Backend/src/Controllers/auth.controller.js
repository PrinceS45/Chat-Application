import User from "../Models/user.model.js";
import bcrypt from "bcryptjs"
import { genrateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
const signup = async (req , res ) => {
    const {fullName , email , password} = req.body ; 
     
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({
                message : "All field required"
            }) ;
        }
        if(password.length < 6) {
            return res.status(400).json({message : "Password must be atleast 6 character"}) ; 
        }
        // find user 
        const user = await User.findOne({email}) ; 
        if(user) return res.status(400).json({message : "Email already exit"}) ; 
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password , salt) ; 

        const newUser = new User({
            fullName , 
            email , 
            password : hashedPassword , 
         })  ; 
         if(newUser) {
            // genrate jwt 
            genrateToken(newUser._id , res) ; 
            await newUser.save() ; 

            res.status(201).json({
                _id: newUser._id , 
                fullName : newUser.fullName , 
                email : newUser.email , 
                profilePic : newUser.profilePic , 
            }) ; 
         }
         else {
            return res.status(400).json({message : "Invalid User Data"}) ; 
         }
    }
    catch(error) {
       console.log("Error in signup controller" , error.message)      ; 

       res.status(500).json({
        message : "Interval Server Error" 
       }); 
    }
}
const login = async (req , res ) => {
    const {email , password} = req.body ; 

    try {
        const user =await User.findOne({email}) ; 
        if(!user) return res.status(400).json({message : "Invalid Credientials"}) ; 

       const isPasswordCorrect =  await bcrypt.compare(password , user.password) ; 

       if(!isPasswordCorrect) {
          return res.status(400).json({message : "Invalid Credientials"}) ; 
          }
        await genrateToken(user._id , res)   ; 

        return res.status(200).json({
            id : user._id , 
            fullName : user.fullName , 
            email : user.email , 
            profilePic : user.profilePic, 
        })



    } catch (error) {
        console.log("Error in login controller" , error) ; 
        return res.status(500).json({message : "Internal Server Error"}) ; 
    }
}
const logout = (req , res ) => {
        try {
            res.cookie("jwt" , "" , {maxAge : 0} ) ; 
            return res.status(200).json({message :" Log Out Successfulyrs"}) ; 
        } catch (error) {
              console.log("Error in logout controller" , error) ; 
              return res.status(500).json({message : "Internal Server Error"}) ; 
        }
}

const updateProfile = async (req, res) => {
    try {
      const {profilePic} = req.body ; 

      const userId = req.user._id ; 

      if(!profilePic) {
        return res.status(400).json({message : "Profile Pic is required"}) ; 
      }

      const uploadResponse = 
      await cloudinary.uploader.upload(profilePic);

      const updatedUser = await User.findByIdAndUpdate(userId , {profilePic : uploadResponse.secret_url} , {new : true}) ; 

      return res.status(200).json(updatedUser) ; 
    } catch (error) {
          console.log("Error in upadateProfile" , error) ; 
          return res.status(500).json({message :"Internal Server Error"}) ; 
    }
}


const checkAuth = (req , res) => {
    try {
        res.status(200).json(req.user) ; 
    } catch (error) {
        console.log("Error in checkAuth controller" , error.message) ; 

        res.status(500).json({message : "Internal Server error"}) ; 
    }
}

export {signup , login , logout , updateProfile , checkAuth} ; 