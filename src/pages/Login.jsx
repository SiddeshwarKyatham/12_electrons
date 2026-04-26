import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { notifyLoginSuccess } = useEventNotifications()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/marketplace'

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      setError('Email and password are required')
      return
    }

    try {
      setError('')
      setLoading(true)
      await login(email, password)
      notifyLoginSuccess(email)
      toast.success('Welcome back')
      navigate(from, { replace: true })
    } catch (authError) {
      setError(authError.message || 'Unable to login')
      toast.error(authError.message || 'Unable to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-panel space-y-5 p-6 sm:p-8"
      >
        <h1 className="font-display text-3xl text-white">Login</h1>

        {error ? <p className="rounded-lg bg-rose-500/15 p-3 text-sm text-rose-200">{error}</p> : null}

        <div>
          <label htmlFor="login-email" className="text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
            placeholder="you@campus.edu"
          />
        </div>

        <div>
          <label htmlFor="login-password" className="text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>

        <p className="text-center text-sm text-slate-300">
          New here?{' '}
          <Link to="/signup" className="font-medium text-cyan-300 hover:text-cyan-200">
            Create an account
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

export default Login
