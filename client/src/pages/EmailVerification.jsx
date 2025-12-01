import { useState ,useRef, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion";
import {useAuthStore} from "../store/auth.store.js"
     
     const EmailVerification = () => {
          const {verifyEmail,isLoading,error} = useAuthStore();
     const [code,setCode] = useState(["","","","","",""])
     const inputRefs = useRef([]);
     const navigate = useNavigate()
     const handleChange = (index,value) => {
          const newCode  = [...code];
          if(value.length>1){
               const pastedCode = value.slice(0,6).split("");
               for(let i = 0 ; i<6 ; i++){
                    newCode[i]=pastedCode[i] || "";
               }
               setCode(newCode);

               //move focus to the next input field if value is entered
               const lastFilledIndex = newCode.findLastIndex((digit)=> digit !== "");
               const focusIndex = lastFilledIndex<5 ? lastFilledIndex+1 : 5;
               inputRefs.current[focusIndex].focus();
          }else{

               newCode[index]=value;
               setCode(newCode);
               if(value && index < 5){
                    inputRefs.current[index+1].focus();
               }
          }
     }

     const handleKeyDown = (index,e) => {
          if(e.key === "Backspace" && !code[index] && index>0){
               inputRefs.current[index-1].focus();
          }
     }

     const handleSubmit = async(e) =>{
          e.preventDefault();
          const verificationCode = code.join('');
          alert(`Verification code submitted : ${verificationCode}`)
          await verifyEmail(verificationCode);
          navigate("/");
     }
     useEffect(()=>{
          if(code.every(digit => digit!="")){
               const verification = code.join('');
               console.log(verification);
               handleSubmit(new Event('submit'))
          }
     },[code])

  return (
    
          <motion.div
               initial={{opacity:0,y:50}}
               animate={{opacity:1,y:0}}
               transition={{duration:0.5}}
               className="bg-gray-800/80 
               rounded-3xl backdrop-filter backdrop-blur-xl shadow-2xl p-6 w-full max-w-md"
          >
               <h2 className="text-3xl font-bold mb-6  bg-linear-to-br from-green-500 to-emerald-500 text-transparent bg-clip-text">
                    Verify Your Email
               </h2>
               <p className="text-xs text-gray-400 mb-5">Enter the 6-digit code sent to your email address.</p>

               <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                    {
                         code.map((digit,index)=>(
                              <input
                                   key={index}
                                   ref={(el)=>(inputRefs.current[index]=el)}
                                   type="text"
                                   value={digit}
                                   maxLength='6'
                                   onChange={(e)=> handleChange(index,e.target.value)}
                                   onKeyDown={(e)=>handleKeyDown(index,e)}
                                   className="w-12 h-12 text-center text-2xl bg-gray-700  text-white border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none
                                   focus:scale-125
                                   "
                              />
                         ))
                    }
                    </div>

                    {error && <p className='text-red-600 text-sm text-center'>{error}</p> }

                    <motion.button 
                         whileHover={{scale:1.025}}
                         whileTap={{scale:0.95}}
                         type="submit"
                         disabled={isLoading || code.some((digit)=>(!digit))}
                         className="w-full bg-linear-to-br from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 disabled:opacity-50"
                    >
                         {isLoading ? "verifying...." : "Verify Email"}
                    </motion.button>
               </form>   

               <motion.button 
               whileHover={{scale:1.25}}
               whileTap={{scale:0.95}} className="mt-6 text-xs text-green-500 underline hover:text-green-800">Resend Otp</motion.button> 
          </motion.div>
    
  )
}

export default EmailVerification