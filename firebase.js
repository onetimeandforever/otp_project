import { initializeApp } from "firebase/app";
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBS2DlDIfikKsndYn2st7ZIpgINNjjkPNo",
    authDomain: "otp-project-4bf49.firebaseapp.com",
    projectId: "otp-project-4bf49",
    storageBucket: "otp-project-4bf49.appspot.com",
    messagingSenderId: "1031054061827",
    appId: "1:1031054061827:web:393acdedda199a27703936"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default app