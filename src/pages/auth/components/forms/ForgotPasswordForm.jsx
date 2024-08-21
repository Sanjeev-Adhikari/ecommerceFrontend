import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../../../store/authSlice'
import { STATUSES } from '../../../../globals/misc/statuses'

const ForgotPasswordForm = () => {

    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const {status, data} = useSelector((state)=>state.auth)

    const dispatch = useDispatch()
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(forgotPassword({email}))
    }

    useEffect(()=>{
        if(status === STATUSES.SUCCESS){
            navigate("/verifyotp")
        }
    },[status])
    
  return (
   <>
<main id="content" role="main" className="w-full max-w-md mx-auto p-6">
    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7 mt-40">
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <Link to={"/login"} className="text-yellow-600 decoration-2 hover:underline font-medium" href="#">
              Login here
            </Link>
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Enter Email and we will send an OTP on your email </p>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label for="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div className="relative">
                  <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" placeholder='email' className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500 shadow-sm" required aria-describedby="email-error" />
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
              </div>
              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Get OTP</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    
  </main>
   </>
  )
}

export default ForgotPasswordForm