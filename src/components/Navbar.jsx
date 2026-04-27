import { LogOut, Menu, User, X } from 'lucide-react'
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
    `text-sm font-normal transition-colors duration-150 ${
      isActive ? 'text-[var(--navy)] font-medium' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
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
    <nav className="sticky top-0 z-[100] flex h-[60px] items-center justify-between border-b border-[var(--border)] bg-white/80 px-4 sm:px-10 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center">
          <img src="/logo.png" alt="12 Electrons logo" className="h-full w-full object-contain mix-blend-multiply" />
        </div>
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--navy)]">
          12 Electrons
        </span>
      </Link>

      <button
        type="button"
        className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-secondary)] md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="hidden items-center gap-2.5 md:flex">
        <NotificationBell />
        {currentUser ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-primary)]">
              <User size={14} className="text-[var(--text-tertiary)]" />
              {currentUser.email}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="btn-ghost inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut size={14} />
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-ghost">
              Log in
            </Link>
            <Link to="/signup" className="btn-primary">
              Get started &rarr;
            </Link>
          </>
        )}
      </div>

      {open ? (
        <div className="absolute left-0 right-0 top-[60px] flex flex-col gap-3 border-b border-[var(--border)] bg-white p-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-3">
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

          <div className="mt-2 flex flex-col gap-3 border-t border-[var(--border)] pt-4">
            {currentUser ? (
              <>
                <span className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)]">
                  {currentUser.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="btn-ghost justify-start px-0 text-left"
                >
                  {loggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn-ghost justify-start px-0"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="btn-primary justify-center"
                >
                  Get started &rarr;
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  )
}

export default Navbar
