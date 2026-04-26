/* eslint-disable no-undef */
// Service worker for handling background notifications

self.addEventListener('push', (event) => {
  const data = event.data?.json() || {}
  const notificationTitle = data.notification?.title || 'Notification'
  const notificationOptions = {
    body: data.notification?.body || '',
    icon: '/favicon.svg',
  }

  event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus()
      }
      return clients.openWindow('/')
    }),
  )
})

