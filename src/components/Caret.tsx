import { motion } from "framer-motion"

const Caret = () => {
    return (
        <motion.div 
          layout
          className="bg-green-500 w-0.5 h-7 inline-block align-middle rounded-full"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ 
            opacity: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
            layout: { type: "spring", stiffness: 800, damping: 35 } 
          }}
          aria-hidden="true"
        />
    )
}

export default Caret