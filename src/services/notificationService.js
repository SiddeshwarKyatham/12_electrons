import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import app from '../firebase'

let messaging = null

// Initialize messaging only on client-side
if (typeof window !== 'undefined') {
  try {
    messaging = getMessaging(app)
  } catch {
    console.log('Messaging not available in this environment')
  }
}

/**
 * Request notifcation permission from user
 * @returns {Promise<string|null>} FCM token or null if permission denied
 */
export const requestNotificationPermission = async () => {
  if (!messaging) {
    console.log('Messaging not initialized')
    return null
  }

  try {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      })
      console.log('FCM Token:', token)
      return token
    } else {
      console.log('Notification permission denied')
      return null
    }
  } catch (err) {
    console.error('Error requesting notification permission:', err)
    return null
  }
}

/**
 * Listen for foreground notifications
 * @param {Function} callback - Function to call when notification is received
 */
export const listenForNotifications = (callback) => {
  if (!messaging) {
    console.log('Messaging not initialized')
    return () => {}
  }

  return onMessage(messaging, (payload) => {
    console.log('Foreground notification received:', payload)
    if (callback) {
      callback(payload)
    }
  })
}

/**
 * Send local notification to user
 * @param {string} title - Notification title
 * @param {object} options - Notification options (body, icon, etc)
 */
export const sendLocalNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.svg',
      ...options,
    })
  }
}
