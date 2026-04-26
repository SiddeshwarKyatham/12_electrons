# Firebase Cloud Messaging (FCM) Notifications Setup

Your app now includes Firebase Cloud Messaging for sending notifications to users. Follow these steps to enable it.

## Step 1: Enable Cloud Messaging in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Cloud Messaging** (in the left sidebar, under Engage)
4. Click **Enable** if not already enabled
5. Under **Web configuration**, you'll see your Sender ID and VAPID Key

## Step 2: Get Your Web Push Certificate (VAPID Key)

1. In Cloud Messaging, look for the **Web Push certificates** section
2. You should see one generated automatically
3. Click the copy icon next to the Key pair to copy your VAPID public key
4. Paste it into your `.env` file:

```env
VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
```

## Step 3: Update Your .env File

Your `.env` file should now have:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key
```

## What Notifications Does Your App Send?

The app now sends notifications for:

### When Selling a Component
- ✅ **Component Listed** - When user adds a new component from the /sell page

### When Making Buy/Rent Requests
- ✅ **New Buy Request** - When someone wants to buy the user's component
- ✅ **New Rent Request** - When someone wants to rent the user's component

### When Submitting Repair Requests
- ✅ **New Repair Request** - When user submits a repair request

### When Logging In/Out
- ✅ **Login Success** - Notification confirming successful login
- ✅ **Logout** - Notification confirming logout

## How Notifications Work

1. **Permission Request** - When you first use the app, it will ask permission to send notifications
2. **Click Accept** to enable notifications
3. **Foreground Notifications** - When the app is open, notifications appear immediately
4. **Background Notifications** - When the app is closed, notifications are handled by the service worker

## Service Worker

The app includes a service worker (`firebase-messaging-sw.js`) that:
- Handles background notifications when the app is closed
- Shows notifications in your system notification center
- Automatically registered when the app loads

## Browser Support

Notifications work on:
- ✅ Chrome (Desktop & Android)
- ✅ Firefox (Desktop & Android)
- ✅ Edge
- ✅ Safari 16+ (macOS 13+)

## Troubleshooting

### Notifications Not Showing?
1. Check browser settings - Make sure notifications are allowed for localhost/your domain
2. Service Worker - Open DevTools > Application > Service Workers, check if registered
3. VAPID Key - Make sure you've added the VAPID key to your .env file
4. Browser Console - Check for any error messages (F12)

### Permission Denied?
- You can re-enable notifications in browser settings:
  - Chrome: Settings > Privacy > Notifications > Find your site and allow
  - Firefox: Check browser console for permission status

## Testing Notifications

1. Start your app: `npm run dev`
2. Accept notifications when prompted
3. Test each feature:
   - Go to `/sell` and add a component → You'll see a "Component Listed" notification
   - Go to `/marketplace` and click "Buy" or "Rent" → You'll see action notifications
   - Go to `/repair` and submit a request → You'll see a "Repair Request" notification
   - Login/Logout → You'll see auth notifications

---

For more details on Firebase Cloud Messaging, see [Firebase Docs](https://firebase.google.com/docs/cloud-messaging)
