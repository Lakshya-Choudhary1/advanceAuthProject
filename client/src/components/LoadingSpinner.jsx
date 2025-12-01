import {motion} from "framer-motion"
const LoadingSpinner = () => {
  return <div className="min-h-screen bg-linear-to-br  from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
     <motion.div className="h-14 w-14 border-5 border-emerald-800 border-t-emerald-500 rounded-full"
          animate={{rotate:360}}
          transition={{duration:1,repeat:Infinity ,ease:"linear"}}
     />
  </div>
}

export default LoadingSpinner;