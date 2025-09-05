import { motion } from 'framer-motion'

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] text-white">
      <motion.h1 
        initial={{opacity:0,y:20}} 
        animate={{opacity:1,y:0}} 
        transition={{duration:0.6}}
        className="text-4xl font-bold text-center"
      >
        🚀 Taskly V3 corrigé fonctionne !
      </motion.h1>
    </div>
  )
}
