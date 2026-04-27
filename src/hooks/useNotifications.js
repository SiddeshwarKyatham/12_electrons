import { useNotificationStore } from '../context/NotificationContext'

/**
 * Hook to trigger in-app notifications on events
 */
export const useEventNotifications = () => {
  const { addNotification } = useNotificationStore()

  const notifyComponentAdded = (componentName) => {
    addNotification({
      title: 'Component Listed! 🎉',
      body: `Your ${componentName} has been added to the marketplace`,
    })
  }

  const notifyBuyRequest = (componentName) => {
    addNotification({
      title: 'New Buy Request! 💰',
      body: `Someone wants to buy your ${componentName}`,
    })
  }

  const notifyRentRequest = (componentName) => {
    addNotification({
      title: 'New Rent Request! 📦',
      body: `Someone wants to rent your ${componentName}`,
    })
  }

  const notifyRepairRequest = (componentType) => {
    addNotification({
      title: 'New Repair Request! 🔧',
      body: `${componentType} needs repair support`,
    })
  }

  const notifyLoginSuccess = (userEmail) => {
    addNotification({
      title: 'Welcome back! 👋',
      body: `Logged in as ${userEmail}`,
    })
  }

  const notifyLogout = () => {
    addNotification({
      title: 'Goodbye!',
      body: 'You have been logged out',
    })
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
