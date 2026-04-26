import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Cpu, ShieldCheck, Wrench } from 'lucide-react'
import GradientButton from '../components/ui/GradientButton'
import GlassCard from '../components/ui/GlassCard'
import SectionHeading from '../components/ui/SectionHeading'

const howItWorks = ['Submit', 'Test', 'Sell/Rent', 'Get Paid']

const services = [
  {
    title: 'Buy / Sell',
    icon: Cpu,
    copy: 'Access affordable parts or list spare components from your lab drawer.',
  },
  {
    title: 'Rent',
    icon: ShieldCheck,
    copy: 'Borrow high-value gear for short-term projects and semester prototypes.',
  },
  {
    title: 'Repair',
    icon: Wrench,
    copy: 'Get diagnostics and repair support for fragile and critical components.',
  },
  {
    title: 'Upcycle',
    icon: CheckCircle2,
    copy: 'Give old electronics new life through verified refurbishment flows.',
  },
]

function LandingPage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="glass-panel soft-glow overflow-hidden p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Student-first hardware marketplace</p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-heading">Buy, Sell, Rent & Repair Electronics</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            12 Electrons helps students move faster by connecting trusted components,
            short-term rentals, and rapid repair support in one clean platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/sell">
              <GradientButton>Sell</GradientButton>
            </Link>
            <Link to="/marketplace">
              <GradientButton variant="secondary">Browse</GradientButton>
            </Link>
            <Link to="/marketplace">
              <GradientButton variant="secondary">Rent</GradientButton>
            </Link>
          </div>
        </motion.div>
      </section>

      <section>
        <SectionHeading
          title="How It Works"
          copy="Simple workflow designed for speed, trust, and student-friendly pricing."
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="glass-panel p-5"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Step {index + 1}</p>
              <h3 className="mt-3 font-display text-xl text-white">{step}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Services" copy="Everything your electronics workflow needs, from sourcing to maintenance." />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <GlassCard className="p-6">
                <service.icon className="text-cyan-300" size={22} />
                <h3 className="mt-4 font-display text-xl text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{service.copy}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-6 sm:p-8">
        <SectionHeading
          title="Trusted Across Campus"
          copy="Verified components, structured testing, transparent warranty terms, and secure handling from intake to delivery."
        />
      </section>

      <section className="glass-panel soft-glow p-6 text-center sm:p-10">
        <h2 className="font-display text-3xl text-white sm:text-4xl">Start Building Smarter</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 sm:text-base">
          Join the campus-wide ecosystem for faster prototyping and lower hardware costs.
        </p>
        <div className="mt-6">
          <Link to="/marketplace">
            <GradientButton>Go to Marketplace</GradientButton>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
