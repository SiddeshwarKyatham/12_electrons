import { motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

function Repair() {
  const { currentUser } = useAuth()
  const { notifyRepairRequest } = useEventNotifications()
  const [issueDescription, setIssueDescription] = useState('')
  const [componentType, setComponentType] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!currentUser) {
      toast.error('Please login to submit repair requests')
      return
    }

    if (!issueDescription || !componentType) {
      toast.error('All fields are required')
      return
    }

    try {
      setLoading(true)
      await addDoc(collection(db, 'requests'), {
        userId: currentUser.uid,
        type: 'repair',
        description: `${componentType}: ${issueDescription}`,
        createdAt: serverTimestamp(),
      })
      setIssueDescription('')
      setComponentType('')
      notifyRepairRequest(componentType)
      toast.success('Repair request submitted')
    } catch (error) {
      toast.error(error.message || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="section-title">Repair Request</h1>
        <p className="section-copy">Submit faults and get matched with trusted repair support.</p>
      </section>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-panel max-w-2xl space-y-5 p-6"
      >
        <div>
          <label htmlFor="issueDescription" className="text-sm font-medium text-slate-200">
            Issue description
          </label>
          <textarea
            id="issueDescription"
            rows="5"
            value={issueDescription}
            onChange={(event) => setIssueDescription(event.target.value)}
            placeholder="Describe symptoms, failed behavior, and usage context"
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="componentType" className="text-sm font-medium text-slate-200">
            Component type
          </label>
          <input
            id="componentType"
            type="text"
            value={componentType}
            onChange={(event) => setComponentType(event.target.value)}
            placeholder="e.g. ESP32 Dev Board"
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Send Repair Request'}
        </button>
      </motion.form>
    </div>
  )
}

export default Repair
