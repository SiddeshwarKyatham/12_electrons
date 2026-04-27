import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Cpu, ShieldCheck, Wrench, Zap, Navigation, Clock, CreditCard, Star } from 'lucide-react'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

function LandingPage() {
  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-24">
      {/* HERO */}
      <section className="mx-auto mt-8 max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-start">
            <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--green-border)] bg-[var(--green-bg)] px-3 py-1 text-xs font-medium text-[var(--green)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--green)]"></span>
              </span>
              Live on campus · CMRCET
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--navy)] sm:text-5xl lg:text-[52px]">
              The smarter way to <br/>
              <span className="relative inline-block">
                <span className="relative z-10">source</span>
                <span className="absolute bottom-1.5 left-0 right-0 h-1.5 rounded-full bg-[var(--accent)] opacity-70"></span>
              </span> electronics
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-[420px] text-[16px] leading-[1.7] text-[var(--text-secondary)]">
              Buy, sell, rent and repair electronics components — all on one trusted campus platform built for students and makers.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2.5">
              <Link to="/marketplace" className="btn-primary py-2.5 px-5 text-[15px]">Browse marketplace &rarr;</Link>
              <Link to="/sell" className="btn-secondary py-2.5 px-5 text-[15px]">List a component</Link>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-9 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-bold text-white">AK</div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-purple-600 text-[10px] font-bold text-white">SR</div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-[10px] font-bold text-white">VR</div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[10px] font-bold text-white">PK</div>
              </div>
              <span className="text-[13px] text-[var(--text-tertiary)]"><strong className="font-medium text-[var(--text-secondary)]">240+ students</strong> already trading</span>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="relative z-10 rounded-[14px] border border-[var(--border)] bg-white p-5 shadow-[var(--shadow-lg)]">
              <div className="mb-3.5 flex items-center justify-between">
                <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-subtle)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)]">Marketplace · Live</span>
                <span className="flex items-center gap-1 text-[11px] text-[var(--green)]"><CheckCircle2 size={12} /> Verified</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { icon: '🔌', bg: 'bg-[#eff6ff]', name: 'Arduino Uno R3', price: '₹120', badge: 'Sell', badgeClass: 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-border)]' },
                  { icon: '📡', bg: 'bg-[#fffbeb]', name: 'Raspberry Pi 4B', meta: '₹80/day', price: '₹80', sub: '/day', badge: 'Rent', badgeClass: 'bg-[var(--amber-bg)] text-[var(--amber)] border-[#fde68a]' },
                  { icon: '🔧', bg: 'bg-[#fdf4ff]', name: 'ESP32 Dev Board', meta: 'Repair needed', price: '₹60', badge: 'Repair', badgeClass: 'bg-[#fdf4ff] text-[#9333ea] border-[#e9d5ff]' }
                ].map((item, i) => (
                  <div key={i} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 transition-all hover:translate-x-0.5 hover:border-[var(--border-strong)] hover:bg-white hover:shadow-[var(--shadow-sm)]">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-[var(--text-primary)]">{item.name}</div>
                      {item.meta && <div className="mt-0.5 text-[11px] text-[var(--text-tertiary)]">{item.meta}</div>}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="font-mono text-[13px] font-medium text-[var(--text-primary)]">{item.price}<span className="text-[10px] text-[var(--text-tertiary)]">{item.sub}</span></div>
                      <span className={`rounded-full border px-1.5 py-[1px] text-[10px] font-medium ${item.badgeClass}`}>{item.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Background floating card effect */}
            <div className="absolute inset-[-8px] z-0 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] top-2.5 left-2.5 right-[-8px] bottom-[-8px]"></div>

            {/* Floating Elements */}
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }} className="absolute -right-[18px] -top-[18px] z-20 rounded-[10px] border border-[var(--border)] bg-white px-[14px] py-2.5 shadow-[var(--shadow-md)]">
              <div className="mb-0.5 text-[10px] text-[var(--text-tertiary)]">Parts listed</div>
              <div className="font-mono text-[18px] font-semibold tracking-[-0.03em] text-[var(--text-primary)] leading-tight">248</div>
              <div className="text-[10px] font-medium text-[var(--green)]">&uarr; 12 today</div>
            </motion.div>

            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2.5 }} className="absolute -bottom-[16px] -left-[16px] z-20 flex items-center gap-2 rounded-[10px] border border-[var(--border)] bg-white px-[14px] py-2.5 shadow-[var(--shadow-md)]">
              <div className="h-2 w-2 rounded-full bg-[var(--green)]"></div>
              <div className="text-xs text-[var(--text-secondary)]">Priya listed a DHT22 sensor</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* LOGOS STRIP */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)] py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--text-muted)]">Trusted By Student communities</span>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-2 gap-[1px] overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--border)] shadow-[var(--shadow-sm)] lg:grid-cols-4"
        >
          {[
            { val: '240+', label: 'Active Students', change: '+12% this week' },
            { val: '₹12k', label: 'Student Savings', change: 'Estimated' },
            { val: '350+', label: 'Components Traded', change: 'All time' },
            { val: '24h', label: 'Avg Repair Time', change: 'Fast turnaround' },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col bg-white p-7">
              <div className="font-mono text-[30px] font-semibold leading-none tracking-[-0.04em] text-[var(--navy)]">{stat.val}</div>
              <div className="mt-1 text-[13px] text-[var(--text-tertiary)]">{stat.label}</div>
              <div className="mt-0.5 text-[12px] font-medium text-[var(--green)]">{stat.change}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="mb-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--accent)]">Services</div>
          <h2 className="mb-3 text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--navy)] sm:text-[36px]">Everything your project needs.</h2>
          <p className="max-w-[520px] text-[16px] leading-[1.7] text-[var(--text-secondary)]">From sourcing that missing microcontroller to getting expert help diagnosing a burnt circuit.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-[1px] overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--border)] shadow-[var(--shadow-sm)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Cpu, title: 'Buy & Sell', desc: 'Find cheap parts from seniors, or sell your old lab components to free up cash.' },
            { icon: Clock, title: 'Short-term Rent', desc: 'Need an oscilloscope or a rare sensor for just one weekend? Rent it directly from peers.' },
            { icon: Wrench, title: 'Campus Repair', desc: 'Hand off broken boards to verified student technicians for quick, affordable fixes.' },
            { icon: Zap, title: 'Upcycle', desc: 'Turn e-waste into opportunity. Trade in dead electronics for spare parts or platform credit.' }
          ].map((s, i) => (
            <div key={i} className="group flex cursor-pointer flex-col gap-3 bg-white p-7 transition-colors hover:bg-[var(--surface)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--navy)] shadow-[var(--shadow-xs)]">
                <s.icon size={18} strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--navy)]">{s.title}</h3>
              <p className="flex-1 text-[13px] leading-[1.65] text-[var(--text-secondary)]">{s.desc}</p>
              <div className="mt-2 flex items-center gap-1 text-[13px] font-medium text-[var(--accent)] transition-all group-hover:gap-2">
                Learn more &rarr;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--accent)]">Process</div>
          <h2 className="text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] text-[var(--navy)] sm:text-[36px]">How 12 Electrons works</h2>
        </div>

        <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div className="absolute top-5 left-[12.5%] right-[12.5%] hidden h-px bg-gradient-to-r from-[var(--accent-border)] via-[var(--border)] to-[var(--accent-border)] sm:block"></div>
          
          {[
            { step: '01', title: 'List or Request', desc: 'Snap a picture of your component or post a request for something you need.' },
            { step: '02', title: 'Connect & Agree', desc: 'Chat securely with buyers, sellers, or technicians to agree on price and terms.' },
            { step: '03', title: 'Meet on Campus', desc: 'Exchange items safely at designated campus hubs (library, labs, cafeteria).' },
            { step: '04', title: 'Review & Build', desc: 'Test the part, leave a review, and get back to building your hardware project.' }
          ].map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white font-mono text-[13px] font-medium text-[var(--accent)] shadow-[var(--shadow-sm)]">
                {s.step}
              </div>
              <h3 className="mb-1 text-[15px] font-semibold tracking-[-0.02em] text-[var(--navy)]">{s.title}</h3>
              <p className="text-[13px] leading-[1.65] text-[var(--text-secondary)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 mt-12">
        <div className="relative overflow-hidden rounded-[20px] bg-[var(--navy)] p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-blue-600/30 blur-[80px]"></div>
          <div className="pointer-events-none absolute -bottom-16 left-[20%] h-[200px] w-[200px] rounded-full bg-blue-500/20 blur-[60px]"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:justify-between md:text-left gap-12">
            <div className="max-w-md">
              <div className="mb-2.5 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-sky-300/80">Get started today</div>
              <h2 className="mb-2.5 text-[32px] font-semibold leading-[1.2] tracking-[-0.03em] text-white">Start building smarter,<br/>spending less.</h2>
              <p className="text-[15px] leading-[1.65] text-white/50">Join 240+ students already trading, renting and repairing on the campus electronics platform.</p>
            </div>
            <div className="flex shrink-0 flex-row gap-2.5">
              <Link to="/marketplace" className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-white px-6 py-3 text-[14px] font-semibold text-[var(--navy)] transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                Browse marketplace &rarr;
              </Link>
              <Link to="/sell" className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-white/15 bg-white/10 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-white/15">
                Sell a part
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
