# Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or sign in to your Google account
3. Enter your project name (e.g., "12 Electrons")
4. Accept the terms and click **Create project**
5. Wait for the project to be created (2-3 minutes)

## Step 2: Enable Authentication

1. In the Firebase Console, go to **Authentication** (left sidebar)
2. Click the **Get started** button
3. Select **Email/Password** as the sign-in method
4. Toggle **Enable** switch on
5. Click **Save**

## Step 3: Create Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **Create database**
3. Choose **Start in test mode** (for development)
   - ⚠️ Note: For production, set up security rules properly
4. Select your region (closest to your location)
5. Click **Create**

## Step 4: Get Your Firebase Credentials

1. In the Firebase Console, go to **Project Settings** (⚙️ icon)
2. Scroll down to find your **Web API Configuration**
3. Look for the code snippet that starts with `const firebaseConfig = {...}`
4. Copy these values:
   - **apiKey** → `VITE_FIREBASE_API_KEY`
   - **authDomain** → `VITE_FIREBASE_AUTH_DOMAIN`
   - **projectId** → `VITE_FIREBASE_PROJECT_ID`
   - **storageBucket** → `VITE_FIREBASE_STORAGE_BUCKET`
   - **messagingSenderId** → `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - **appId** → `VITE_FIREBASE_APP_ID`

## Step 5: Update Your `.env` File

1. Open `.env` in your project root
2. Replace the placeholder values with your actual Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## Step 6: Start Your App

```bash
npm run dev
```

Your app will now connect to your Firebase project!

## Step 7: Test the Setup

1. Open `http://localhost:5173`
2. Try signing up with a test email: `test@example.com`
3. Check Firebase Console → **Authentication** to see your test user
4. Add a component to the marketplace
5. Check Firebase Console → **Firestore** to see the new document

## Firestore Collections (Auto-Created)

The app will automatically create these collections when you use the features:

- **users** - User account data
- **components** - Electronics listings
- **requests** - Buy/Rent/Repair requests

## Security Rules (For Production)

When deploying, implement proper security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Components: read all (public), write only own
    match /components/{doc=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == request.resource.data.ownerId;
    }
    
    // Requests: user's own only
    match /requests/{doc=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

---

**Need Help?** Check the [Firebase Documentation](https://firebase.google.com/docs)
