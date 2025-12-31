import { motion } from "framer-motion"

const Caret = () => {
    return (
        <motion.div 
          className="absolute inset-0 bg-primary-400 "
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
    )
}

export default Caret