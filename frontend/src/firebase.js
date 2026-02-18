import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

/*  Use ENV variables (Vite-safe) */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {

    /*  Smart permission handling */
    if (Notification.permission === "denied") {
      return null;
    }

    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        return null;
      }
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
    });

    if (!token) return null;

    /*  Send token to backend */
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/save-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });

    return token;

  } catch {
    return null;
  }
};
