import { useEffect, useState } from "react"
import {motion} from "framer-motion";
import {User,Lock,Loader} from "lucide-react"
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";
const LoginPage = () => {
  let isLoading = false;
  const {login,user,error} = useAuthStore();
  const [formData , setFormData] = useState({
    email:"",
    password:""
  })

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(formData);
    console.log(error)
    console.log(user)
    await login(formData.email,formData.password);
  }

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  {error && <p className="text-sm text-red-600">{error}</p>}

  return (
    <motion.div
      initial={{y:20 , opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration:0.5}}
    >
      <div className="min-w-md w-full bg-gray-900/70 backdrop-blur-xl backdrop-filter overflow-hidden rounded-2xl shadow-2xl">
          <div className="p-8">
            <h2 className="text-2xl text-center mb-6 font-bold bg-clip-text bg-linear-to-br from-emerald-700 to-green-500 text-transparent">Log In</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">

              <Input
                disabled={isLoading}
                icon={User} 
                name="email" 
                type="email"
                value={formData.email} 
                placeholder="Email Address" 
                onChange={handleChange}
              />
              <Input 
                disabled={isLoading}
                icon={Lock} 
                type="password"
                name="password" 
                value={formData.password} 
                placeholder="Password" 
                onChange={handleChange}
              />

              <div className="flex items-center mb-6">
                  <Link to="/forgot-password" className="text-green-400/50 hover:underline" >Forgot Password ?</Link>
              </div>

              <motion.button 
                  type='submit'
                  
                  className='mt-3 w-full py-3 bg-linear-to-br  from-green-700 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90  transition-all duration-200 flex justify-center items-center'
                  
                  whileHover={{scale:1.025}}
                  whileTap={{scale:0.98}}
                  >
                    {isLoading ? <Loader className="size-5  animate-spin"/> : "Log In"}
                    
                </motion.button>
            </form>
          </div>

          <div className="flex justify-center items-center w-full  p-5 gap-4 bg-gray-950/50">
            <p className="text-gray-400">Don't have an account ? </p>
            <Link to='/signup' className="text-green-600 hover:scale-105 hover:underline transition- duration-75">Sign Up</Link>
          </div>
      </div>
    </motion.div>
  )
}

export default LoginPage