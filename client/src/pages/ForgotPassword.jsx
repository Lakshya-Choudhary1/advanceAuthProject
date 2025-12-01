import { useState } from "react"
import {motion} from "framer-motion"
import {Link} from "react-router-dom"
import {MoveLeftIcon,Mail} from "lucide-react"
import {useAuthStore} from "../store/auth.store.js"
import Input from "../components/Input.jsx"
import LoadingSpinner from "../components/LoadingSpinner.jsx"
export const ForgotPassword = () => {
  
  const {forgotPassword,isLoading,error} = useAuthStore();
  const [email,setEmail] = useState("");
  const [isSubmitted,setIsSubmitted] = useState(false);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setIsSubmitted("true")
    await forgotPassword(email);
  } 

  const handleChange = (e) =>{
    const {value}  = e.target;
    setEmail(value);
  }


  return <motion.div
    initial={{opacity:0,scale:0.8}}
    animate={{opacity:1,scale:1}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-gray-900/60  backdrop-blur-xl backdrop-filter overflow-hidden rounded-2xl shadow-2xl'
  >
    <div className="p-6">
      <h2 className="text-3xl text-center font-semibold bg-linear-to-br from-emerald-600 to-green-400 text-transparent bg-clip-text  mb-3 space-y-6">Forgot Password</h2>

      {!isSubmitted ? (
        <div>
          <p className="w-full py-6 text-white/80 text-center text-sm">Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit} className="py-3">
            <Input icon={Mail} 
                name="email" 
                type="email"
                value={email} 
                placeholder="Email Address" 
                onChange={handleChange}
                required
                className="text-green-700 "/>

            <button type="submit" className="text-center mt-2 w-full p-3 bg-linear-to-br from-emerald-600/80 to-green-500/90 text-stone-100 font-bold text-lg rounded-2xl ">
            {isLoading ? <LoadingSpinner /> : "Send Reset Link"}</button>
          </form>
        </div>) : (<div>
            <div className="text-center">
              <motion.div
              initial={{scale:0}}
              animate={{scale:1}}
              transition={{type:"spring",stiffness: 500 , damping:30}}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center flex-col justify-center mx-auto gap-5"
              >
                <Mail className="h-8 w-8 text-white "/>
              </motion.div>
              <p  className="text-gray-300 mt-4 ">
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
            </div>
        </div>
        )}
      
    </div>
    
    <Link to="/login" className="mt-3 w-full bg-gray-900/50 text- p-3 flex items-center justify-center gap-3  "> 
      <MoveLeftIcon className="text-green-600/70 " />
      <span className="text-green-600/70 ">Back To Login</span>
    </Link>

  </motion.div>
}
