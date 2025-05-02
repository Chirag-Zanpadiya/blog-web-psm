import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex items-center justify-center h-[cal(100vh - 80px)]'>
      <SignIn signInUrl='/register'/>
    </div>
  )
}

export default LoginPage
