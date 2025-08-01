import express from 'express';
import { login, logout, signup , updateProfile , checkAuth } from '../Controllers/auth.controller.js';
import { protectRoute } from '../Middleware/auth.middleware.js';

const router = express.Router() ; 

router.post('/signup' ,signup )


router.post('/login'  , login)

router.get("/logout" , logout)

router.put('/update-profile' , protectRoute , updateProfile) ; 

router.get("/check" , protectRoute , checkAuth)

export default router ;

