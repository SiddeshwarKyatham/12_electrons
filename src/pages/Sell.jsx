import { motion } from 'framer-motion'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

function Sell() {
  const { currentUser } = useAuth()
  const { notifyComponentAdded } = useEventNotifications()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    condition: 'Working',
    status: 'available',
    description: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.name || !formData.price || !formData.description) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      await addDoc(collection(db, 'components'), {
        name: formData.name.trim(),
        price: Number(formData.price),
        condition: formData.condition,
        status: formData.status,
        description: formData.description.trim(),
        ownerId: currentUser.uid,
        createdAt: serverTimestamp(),
      })

      setFormData({ name: '', price: '', condition: 'Working', status: 'available', description: '' })
      notifyComponentAdded(formData.name)
      toast.success('Component listed successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to submit component')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="section-title">Sell Component</h1>
        <p className="section-copy">Submit your spare components and reach verified student buyers.</p>
      </section>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-panel max-w-2xl space-y-5 p-6"
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-200">
            Component name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Arduino Nano"
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="condition" className="text-sm font-medium text-slate-200">
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
          >
            <option>Working</option>
            <option>Refurbished</option>
            <option>Faulty</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="text-sm font-medium text-slate-200">
            Expected price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g. 25"
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-medium text-slate-200">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mention age, included accessories, and performance details"
            className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Submitting...' : 'Submit Listing'}
        </button>
      </motion.form>
    </div>
  )
}

export default Sell
