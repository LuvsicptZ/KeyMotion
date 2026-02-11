import { motion } from "framer-motion"

const Caret = () => {
    return (
        <motion.div 
          layout
          className="bg-yellow-500 w-1 h-8 inline-block align-middle shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ 
            opacity: { duration: 1.0, repeat: Infinity, ease: "easeInOut" },
            layout: { type: "spring", stiffness: 800, damping: 35 } 
          }}
          aria-hidden="true"
        />
    )
}

export default Caret