import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import {Routes , Route, Navigate} from "react-router-dom" ; 
import HomePage from './pages/HomePage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore'
import { Home, Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'


function App() {
  const {authUser , checkAuth , isCheckingAuth } = useAuthStore() ; 
  
  const{theme} = useThemeStore() ; 

  useEffect(()=> {
    checkAuth(); 
  } , [checkAuth])

  console.log(authUser) ; 
  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen' >
    <Loader className='size-10 animate-spin'/>
       </div>
  )

  return (
    <div data-theme= {theme}>
      <Navbar/>
       <Routes>
        <Route path='/' element = {authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path='/signup' element = {!authUser ?  <SignUpPage/> : <Navigate to={'/'} />} />
        <Route path='/login' element = {!authUser ? <LoginPage/> : <Navigate to={"/"} />} />
        <Route path='/settings' element ={<SettingsPage/>} />
        <Route path='/profile' element = {authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
       </Routes>

       <Toaster/> 
    </div>
  )
  
}

export default App
