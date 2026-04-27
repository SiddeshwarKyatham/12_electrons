import { Bell, Trash2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { useNotificationStore } from '../context/NotificationContext'

function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)
  const dropdownRef = useRef(null)
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } =
    useNotificationStore()

  const formatTime = (timestamp) => {
    const now = new Date()
    const diff = now - new Date(timestamp)
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return new Date(timestamp).toLocaleDateString()
  }

  const handleNotificationClick = (id) => {
    markAsRead(id)
  }

  const handleBellClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleBellClick}
        className="relative rounded-lg border border-slate-700/60 bg-slate-900/70 p-2 text-slate-200 transition hover:bg-slate-800 hover:text-white"
        aria-label="View notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 text-xs font-bold text-slate-950">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-slate-700/60 bg-slate-900/95 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-700/40 px-4 py-3">
            <h3 className="font-display text-sm font-semibold text-white">Notifications</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white"
              aria-label="Close notifications"
            >
              <X size={16} />
            </button>
          </div>

          {notifications.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-400">
              No notifications yet
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onMouseEnter={() => setHoveredId(notification.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`border-b border-slate-700/30 px-4 py-3 cursor-pointer transition ${
                      notification.read ? 'bg-slate-900/40' : 'bg-slate-800/60'
                    } ${hoveredId === notification.id ? 'bg-slate-800/80' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-2 w-2 rounded-full ${
                          notification.read ? 'bg-slate-600' : 'bg-cyan-400'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white line-clamp-2">
                          {notification.title}
                        </p>
                        {notification.body && (
                          <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                            {notification.body}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-slate-500">{formatTime(notification.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {notifications.length > 0 && (
                <div className="flex gap-2 border-t border-slate-700/40 px-4 py-2">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllAsRead}
                      className="flex-1 rounded px-2 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 transition"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={clearNotifications}
                    className="flex items-center justify-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-400 hover:bg-slate-800 transition"
                  >
                    <Trash2 size={12} />
                    Clear
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default NotificationBell
