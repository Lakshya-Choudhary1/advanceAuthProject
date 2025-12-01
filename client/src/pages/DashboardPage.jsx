import {motion} from "framer-motion";
import { useAuthStore } from "../store/auth.store.js";
import { LogOut } from "lucide-react";
import { Navigate } from "react-router-dom";
function DashboardPage() {
  const {user,logout
  } = useAuthStore();

  

  const handleLogout = async()=>{
    await logout()
  }

  return (
    <motion.div
      draggable="true"
      initial={{opacity:0,scale:0.9}}
      animate={{opacity:1,scale:1}}
      exit={{opacity:0,scale:0.9}}
      transition={{duration:0.5}}
      className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900/80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-linear-to-br from-green-400 to-emerald-600 text-transparent bg-clip-text">
        DashBoard
      </h2>

      <div className="space-y-6">
        <motion.div 
        className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        transition={{delay:0.2}}
        >
            <h3 className="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
            <hr className="text-gray-500 mb-5"/>
          
          <h1 className="text-amber-50">Name : {user.name? user.name : 'not Exists'}</h1>
          <h1 className="text-amber-50">Email : {user.email? user.email : 'not Exists'}</h1>
           
             
        </motion.div>
        <motion.div className="pt-2 text-red-600/90 font-bold  pr-4 text-lg hover:opacity-70" onClick={handleLogout}>
          Log Out
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DashboardPage