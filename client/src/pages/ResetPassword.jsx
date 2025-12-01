import { useParams,useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { useAuthStore } from "../store/auth.store.js";
import { useState } from "react";
import toast from "react-hot-toast"
import Input from "../components/Input.jsx";
import { Lock } from "lucide-react";


const ResetPassword = () => {
  const [formData , setFormData] = useState({
    password:'',
    confirmPassword:''
  })
  const navigate = useNavigate();
  const {resetPassword,isLoading,message} = useAuthStore();
  const {token} = useParams();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if((formData.password == formData.confirmPassword)&& formData != ''){
      try{
        await resetPassword(token,formData.password);
        toast.success('password successfully created');
        setTimeout(()=>{
          navigate('/signup') 
        },2000)
      }catch(err){
        console.log(err)
        toast.error(`${err.message || "Error Resetting password"}`)
      }
    }else{
      return;
    }
    
  }
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }


  return (
    <motion.div className=' max-w-md w-full overflow-hidden bg-gray-800 p-6 rounded-3xl'
    initial={{scale:.95,opacity:0,y:20}}
    animate={{opacity:1,scale:1,y:0}}
    transition={{duration:.5}}
    >
      <h1  className="text-4xl  font-bold text-center bg-linear-to-br  from-emerald-600 to-green-400 text-transparent bg-clip-text rou">RESET PASSWORD</h1>
      

      <form onSubmit={handleSubmit}>
          <Input  
              icon={Lock}
              type='password'
              name='password'
              placeholder='New Password'
              value={formData.password}
              onChange={handleChange}
              required    
          />

          <Input  
              icon={Lock}
              type='password'
              name='confirmPassword'
              placeholder='Confirm New Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required    
          />

          <motion.button
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}
            className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-700 rounded-xl shadow-lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading? 'Resetting...' : 'Set New Password'}
          </motion.button>
      </form> 
    </motion.div>
  )
}

export default ResetPassword