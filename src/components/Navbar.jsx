import { LogOut, Menu, User, X, Zap } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import NotificationBell from './NotificationBell'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { name: 'Home', to: '/' },
  { name: 'Marketplace', to: '/marketplace' },
  { name: 'Sell', to: '/sell' },
  { name: 'Repair', to: '/repair' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const { currentUser, logout } = useAuth()
  const { notifyLogout } = useEventNotifications()
  const navigate = useNavigate()

  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-slate-800/80 text-cyan-300' : 'text-slate-300 hover:text-white'
    }`

  const handleLogout = async () => {
    try {
      setLoggingOut(true)
      await logout()
      notifyLogout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Failed to log out')
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-4 z-30 pt-4">
      <nav className="glass-panel soft-glow relative px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-cyan-400/20 p-2 text-cyan-300">
              <Zap size={18} />
            </span>
            <span className="font-display text-sm font-semibold tracking-wide text-white sm:text-base">
              12 Electrons
            </span>
          </Link>

          <button
            type="button"
            className="rounded-lg border border-slate-700/60 bg-slate-900/60 p-2 text-slate-200 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <NotificationBell />
            {currentUser ? (
              <>
                <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-xs text-slate-200">
                  <User size={14} />
                  {currentUser.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-xs text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut size={14} />
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 px-3 py-2 text-sm font-semibold text-slate-950"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {open ? (
          <div className="mt-3 space-y-3 border-t border-slate-700/50 pt-3 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={navLinkClass}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-slate-700/50 pt-3">
              {currentUser ? (
                <>
                  <span className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-xs text-slate-200">
                    {currentUser.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-xs text-slate-200"
                  >
                    {loggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 px-3 py-2 text-sm font-semibold text-slate-950"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  )
}

export default Navbar
