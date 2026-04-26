/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react'

const NotificationContext = createContext(null)

export function useNotificationStore() {
  return useContext(NotificationContext)
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const addNotification = useCallback((notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      read: false,
      timestamp: new Date(),
      ...notification,
    }

    setNotifications((prev) => [newNotification, ...prev].slice(0, 50))
    setUnreadCount((prev) => prev + 1)

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 5 * 60 * 60 * 1000)
  }, [])

  const markAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
