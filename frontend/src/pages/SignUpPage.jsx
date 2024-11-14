import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const SignUpPage = ({ url }) => {
  return (
    <div className='flex justify-end'>
      <SignUp />
    </div>
  )
}

export default SignUpPage
