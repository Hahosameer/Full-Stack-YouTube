// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB76yod7xQcIc05jHTgCFqndQ8LuwU2D7A",
  authDomain: "video-e27e8.firebaseapp.com",
  projectId: "video-e27e8",
  storageBucket: "video-e27e8.appspot.com",
  messagingSenderId: "237756774925",
  appId: "1:237756774925:web:ead46ffe6a8c72ecf2b344",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app }; // exporting named exports
export default app; // exporting the default app
