import { motion } from 'framer-motion'

function GradientButton({ children, className = '', variant = 'primary', ...props }) {
  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 text-slate-950 shadow-[0_15px_40px_-20px_rgba(45,212,191,0.8)]',
    secondary: 'border border-slate-600/80 bg-slate-900/40 text-slate-100 backdrop-blur-md',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default GradientButton
