import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setError('')
      setLoading(true)
      await signup(email, password)
      toast.success('Account created successfully')
      navigate('/marketplace')
    } catch (authError) {
      setError(authError.message || 'Unable to create account')
      toast.error(authError.message || 'Unable to create account')
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
        <h1 className="font-display text-3xl text-white">Signup</h1>

        {error ? <p className="rounded-lg bg-rose-500/15 p-3 text-sm text-rose-200">{error}</p> : null}

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
            placeholder="you@campus.edu"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
            placeholder="Minimum 6 characters"
          />
        </div>

        <div>
          <label htmlFor="signup-confirm-password" className="text-sm font-medium text-slate-200">
            Confirm password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
            placeholder="Repeat password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Signup'}
        </button>

        <p className="text-center text-sm text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  )
}

export default Signup
