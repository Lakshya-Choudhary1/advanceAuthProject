import {motion} from "framer-motion";
const FloatingShape = ({color,left,top,size,delay}) => {
     return <>
          <motion.div className={`absolute rounded-full opacity-20 blur-xl ${color}  ${size}`}
          style={{top,left}}
          animate={{
               x: ["0%","100%","0%"],
               y:["0%","100%","0%"],
               rotate: [0,360]
          }}

          transition={{
               duration: 20,
               ease:"linear",
               repeat:Infinity,
               delay,
          }}

          aria-hidden='true'
          />  
     </>
}

export default FloatingShape;