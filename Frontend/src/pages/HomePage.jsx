import React from 'react'
import { useChatStore } from '../store/useChatStore'

function HomePage() {
   
  const {selectedUser} = useChatStore() ; 
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
         <div className='bg-base-100 rounded-lg shadow-cl'>

         </div>
      </div>

      
    </div>
  )
}

export default HomePage
