import { motion } from 'framer-motion'

function Orb({ className, transition }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={transition}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  )
}

function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Orb
        className="-left-40 top-16 h-80 w-80 bg-cyan-500/25"
        transition={{ duration: 1, delay: 0.1 }}
      />
      <Orb
        className="right-[-120px] top-40 h-72 w-72 bg-blue-500/20"
        transition={{ duration: 1.1, delay: 0.25 }}
      />
      <Orb
        className="bottom-[-140px] left-1/3 h-96 w-96 bg-teal-500/15"
        transition={{ duration: 1.2, delay: 0.35 }}
      />
    </div>
  )
}

export default BackgroundEffects
