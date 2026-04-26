import { useEffect } from 'react'
import { listenForNotifications, sendLocalNotification } from '../services/notificationService'
import { useNotificationStore } from '../context/NotificationContext'

/**
 * Hook to listen for Firebase notifications
 */
export const useNotifications = () => {
  useEffect(() => {
    const unsubscribe = listenForNotifications((payload) => {
      // Handle foreground notifications
      const notification = payload.notification || {}
      sendLocalNotification(notification.title, {
        body: notification.body,
      })
    })

    return unsubscribe
  }, [])
}

/**
 * Hook to trigger notifications on events
 */
export const useEventNotifications = () => {
  const { addNotification } = useNotificationStore()

  const notifyComponentAdded = (componentName) => {
    const notification = {
      title: 'Component Listed! 🎉',
      body: `Your ${componentName} has been added to the marketplace`,
    }
    sendLocalNotification(notification.title, { body: notification.body, tag: 'component-added' })
    addNotification(notification)
  }

  const notifyBuyRequest = (componentName) => {
    const notification = {
      title: 'New Buy Request! 💰',
      body: `Someone wants to buy your ${componentName}`,
    }
    sendLocalNotification(notification.title, { body: notification.body, tag: 'buy-request' })
    addNotification(notification)
  }

  const notifyRentRequest = (componentName) => {
    const notification = {
      title: 'New Rent Request! 📦',
      body: `Someone wants to rent your ${componentName}`,
    }
    sendLocalNotification(notification.title, { body: notification.body, tag: 'rent-request' })
    addNotification(notification)
  }

  const notifyRepairRequest = (componentType) => {
    const notification = {
      title: 'New Repair Request! 🔧',
      body: `${componentType} needs repair support`,
    }
    sendLocalNotification(notification.title, { body: notification.body, tag: 'repair-request' })
    addNotification(notification)
  }

  const notifyLoginSuccess = (userEmail) => {
    const notification = {
      title: 'Welcome back! 👋',
      body: `Logged in as ${userEmail}`,
    }
    sendLocalNotification(notification.title, { body: notification.body, tag: 'login-success' })
    addNotification(notification)
  }

  const notifyLogout = () => {
    const notification = {
      title: 'Goodbye!',
      body: 'You have been logged out',
    }
    sendLocalNotification(notification.title, { body: notification.body, tag: 'logout' })
    addNotification(notification)
  }

  return {
    notifyComponentAdded,
    notifyBuyRequest,
    notifyRentRequest,
    notifyRepairRequest,
    notifyLoginSuccess,
    notifyLogout,
  }
}
