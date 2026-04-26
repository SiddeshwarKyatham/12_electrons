import { motion } from 'framer-motion'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useEventNotifications } from '../hooks/useNotifications'
import Spinner from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'

const categories = ['All', 'Arduino', 'Sensors', 'ICs', 'Tools']

function Marketplace() {
  const { currentUser } = useAuth()
  const { notifyBuyRequest, notifyRentRequest } = useEventNotifications()
  const [components, setComponents] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const componentsQuery = query(collection(db, 'components'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      componentsQuery,
      (snapshot) => {
        const liveComponents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setComponents(liveComponents)
        setLoading(false)
      },
      (error) => {
        setLoading(false)
        toast.error(error.message || 'Failed to fetch components')
      },
    )

    return unsubscribe
  }, [])

  const filteredComponents = useMemo(
    () =>
      components.filter(
        (item) =>
          (category === 'All' || item.category === category) &&
          item.condition !== 'Faulty',
      ),
    [components, category],
  )

  const handleAction = async (item, type) => {
    if (!currentUser) {
      toast.error('Please login to continue')
      return
    }

    try {
      await addDoc(collection(db, 'requests'), {
        userId: currentUser.uid,
        type,
        description: `${type.toUpperCase()} request for ${item.name}`,
        componentId: item.id,
        createdAt: serverTimestamp(),
      })
      if (type === 'buy') {
        notifyBuyRequest(item.name)
      } else if (type === 'rent') {
        notifyRentRequest(item.name)
      }
      toast.success(`${type === 'buy' ? 'Buy' : 'Rent'} request submitted`)
    } catch (error) {
      toast.error(error.message || 'Could not submit request')
    }
  }



  return (
    <div className="space-y-8">
      <section>
        <h1 className="section-title">Marketplace</h1>
        <p className="section-copy">Live inventory from students, labs, and verified campus sellers.</p>
      </section>

      <section className="glass-panel p-4 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="category" className="text-sm font-medium text-slate-200">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700/70 bg-slate-900/70 px-3 py-2 text-sm text-white outline-none ring-cyan-400 transition focus:ring-2"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>



      {loading ? (
        <div className="glass-panel">
          <Spinner label="Fetching components..." />
        </div>
      ) : filteredComponents.length === 0 ? (
        <div className="glass-panel p-6 text-center">
          <p className="text-slate-400">
            {components.length === 0
              ? 'No components available yet. Add one from the Sell page!'
              : `No ${category !== 'All' ? category : ''} components found.`}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            (Total in database: {components.length})
          </p>
        </div>
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel soft-glow p-4"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{item.category || 'General'}</p>
              <h3 className="mt-2 font-display text-lg text-white">{item.name}</h3>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-cyan-300">${item.price}</span>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    item.condition === 'Working'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : item.condition === 'Refurbished'
                        ? 'bg-amber-500/20 text-amber-200'
                        : 'bg-rose-500/20 text-rose-200'
                  }`}
                >
                  {item.condition}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-400">Status: {item.status || 'available'}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleAction(item, 'buy')}
                  disabled={!currentUser}
                  className="rounded-lg bg-gradient-to-r from-cyan-400 via-teal-400 to-sky-400 px-3 py-2 text-xs font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => handleAction(item, 'rent')}
                  disabled={!currentUser}
                  className="rounded-lg border border-slate-600/80 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Rent
                </button>
              </div>
              {!currentUser ? <p className="mt-2 text-xs text-slate-500">Login required for actions</p> : null}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Marketplace
