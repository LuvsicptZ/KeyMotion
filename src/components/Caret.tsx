import { motion } from "framer-motion"

const Caret = () => {
    return (
        <motion.div 
          className="bg-green-500 w-0.5 h-7 inline-block"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
    )
}

export default Caret