import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Mail, User , Lock, Loader} from "lucide-react"
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import { useAuthStore } from '../store/auth.store.js'

const SignUpPage = () => {
  const navigate = useNavigate();

  const {signup,error,isLoading} = useAuthStore();

   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSignUp = async(e) => {
    e.preventDefault()
    try{
      await signup(formData.email,formData.name,formData.password);
      navigate("/verify-email")
    }catch(error){
      console.log(error.message);
    }
  }

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full bg-gray-900/70
           backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden`}
      >
        <div className="p-8">
          <h2 className='text-center text-2xl font-bold mb-6 bg-linear-to-br from-green-700 to-emerald-500 text-transparent bg-clip-text'>
            Create an Account
          </h2>

          <form onSubmit={handleSignUp} className="flex flex-col gap-5">
            {/* name */}
            <Input
              icon={User}
              type='text'
              name='name'
              placeholder='Full Name'
              value={formData.name}
              onChange={handleChange}
            />

            {/* email */}
            <Input
              icon={Mail}
              type='email'
              name='email'
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
            />

            {/* password */}
            <Input
              icon={Lock}
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />

            {error && <p className='text-red-600 text-sm text-center'>{error}</p> }

            {/* Password Strength meter */}
            <PasswordStrengthMeter password={formData.password}/>
            
            {/* submit */}
            <motion.button
              type='submit'
              className='mt-3 w-full py-3 bg-linear-to-br  from-green-700 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90  transition-all duration-200'
              whileHover={{scale:1.025}}
              whileTap={{scale:0.98}}
            >
              {isLoading ? <Loader className='animate-spin mx-auto'/> : "Sign UP"}
            </motion.button>
          </form>
        </div>

        <div className='flex justify-center items-center mt-1 p-5 gap-3 bg-gray-950/55 w-full'>
            <p className='text-[17px] text-gray-300 '>Already have an account?</p>

            <Link to='/login' className='text-green-600 hover:scale-105 hover:underline transition-all duration-100'>Log in</Link>
          </div>
      </motion.div>
    </>
  )
}

export default SignUpPage
