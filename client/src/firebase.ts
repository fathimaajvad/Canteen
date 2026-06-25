import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-7dHEqntsTTQB115wdVyqWMBg2RKEA3M",
  authDomain: "campus-bites-98ead.firebaseapp.com",
  projectId: "campus-bites-98ead",
  storageBucket: "campus-bites-98ead.firebasestorage.app",
  messagingSenderId: "501733344823",
  appId: "1:501733344823:web:c999ddffb1ea2683eda1b2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();