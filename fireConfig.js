// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'ISI_DARI_FIREBASE',
  authDomain: 'ISI_DARI_FIREBASE',
  projectId: 'ISI_DARI_FIREBASE',
  storageBucket: 'ISI_DARI_FIREBASE',
  messagingSenderId: 'ISI_DARI_FIREBASE',
  appId: 'ISI_DARI_FIREBASE'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
