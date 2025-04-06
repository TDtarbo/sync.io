import { motion } from "framer-motion"

const Feature = ({feature, index}) => {
    return (
        <motion.div 
        initial={{x:200, opacity:0}}
        animate={{x:0, opacity:1}}
        transition={{delay: .7 + 0.1 * index, duration: .3}}
        className="mt-6">
        <div className="flex justify-center items-center gap-4 ">
       <svg
         className="stroke-white h-8 w-8"
         fill="none"
         viewBox="0 0 24 24"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
         />
       </svg>
       <p className="text-white text-xl">{`${feature}.`}</p>
     </div>
     </motion.div>
    )
}

export default Feature