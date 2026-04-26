import { motion } from 'framer-motion'

function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={`glass-panel ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
