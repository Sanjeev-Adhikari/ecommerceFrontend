import { useDispatch, useSelector } from "react-redux"

import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { registerUser } from "../../../../store/authSlice"
import { STATUSES } from "../../../../globals/misc/statuses"


const RegistrationForm = () => {

const navigate = useNavigate()
const dispatch = useDispatch()
const {status} = useSelector((state)=>state.auth)
  const [userData, setUserData] = useState({
    userName : "",
    email : "",
    phoneNumber : "",
    password : ""
    
    
})

const handleChange = (e)=>{

    const {name,value} = e.target

    setUserData({
        ...userData,
        [name] : value
    })
}

const handleSubmit = (e)=>{
  e.preventDefault()
  dispatch(registerUser(userData))
  if(status === STATUSES.SUCCESS){
    return navigate("/login")
  }
  if(status === STATUSES.ERROR){
   alert("Something went wrong, try again")
  return
  }

}


  return (
    
    <>
  
  <div className="  h-screen overflow-hidden flex items-center justify-center">
  <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
    <div className=" mt-12 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
     
    </div>
    <form className="p-10 md:p-20" onSubmit={handleSubmit} >
      <div className="flex items-center text-sm mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text" name="userName"  id="userName" onChange={handleChange} className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="userName" />
      </div>
      <div className="flex items-center text-sm mb-6 md:mb-8">
      <svg className="absolute ml-3" width="24" height="24" viewBox="0 0 24 24">
  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zM4 18V8l8 5 8-5v10H4z"/>
</svg>

        <input type="email" name="email"  id="email" onChange={handleChange} className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="email" />
      </div>
      <div className="flex items-center text-sm mb-6 md:mb-8">
      <svg className="absolute ml-3" width="24" height="24" viewBox="0 0 24 24">
  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.43 21 3 13.57 3 4.5c0-.55.45-1 1-1H7.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.16.43.07.92-.24 1.12l-2.2 2.2z"/>
</svg>

        <input type="number" name="phoneNumber" id="phoneNumber" onChange={handleChange}  className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="phoneNumber" />
      </div>
      <div className="flex items-center text-sm mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" name="password"  id="password" onChange={handleChange} className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="password" />
      </div>
      <button className="bg-yellow-400 hover:bg-yellow-500 font-medium p-2 md:p-4 text-white uppercase w-full rounded-full" >Register</button>
    </form>
  </div>
 </div>
    </>
  
)
}

export default RegistrationForm