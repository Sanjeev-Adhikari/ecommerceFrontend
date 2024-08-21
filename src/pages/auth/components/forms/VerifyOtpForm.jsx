import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { verifyOtp } from '../../../../store/authSlice'
import { STATUSES } from '../../../../globals/misc/statuses'

const VerifyOtpForm = () => {

    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const {forgotPasswordData} = useSelector((state)=>state.auth)
    const data2 = {
        email : forgotPasswordData.email,
        otp : otp
    }

    const dispatch = useDispatch()
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(verifyOtp(data2))
    }

    useEffect(()=>{
        if(forgotPasswordData.status === STATUSES.SUCCESS){
            navigate("/resetpassword")
        }
    },[forgotPasswordData.status])
    
  return (
   <>
<main id="content" role="main" className="w-full max-w-md mx-auto p-6">
    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 sm:p-7 mt-40">
        <div className="text-center">
        
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Enter OTP you received on your email </p>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-4">
              <div>
                <label for="otp" className="block text-sm font-bold ml-1 mb-2 dark:text-white">OTP here</label>
                <div className="relative">
                  <input onChange={(e)=>setOtp(e.target.value)} type="otp" id="otp" name="otp" placeholder='otp' className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-yellow-500 focus:ring-yellow-500 shadow-sm" required aria-describedby="otp-error" />
                </div>
                <p className="hidden text-xs text-red-600 mt-2" id="otp-error">Please enter the otp</p>
              </div>
              <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Verify</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    
  </main>
   </>
  )
}

export default VerifyOtpForm