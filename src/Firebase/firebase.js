import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyADwRq3RPuKmMO4Ik0r2cGV8MiuPyK8F2I",
    authDomain: "stock-tracker-c06b5.firebaseapp.com",
    projectId: "stock-tracker-c06b5",
    storageBucket: "stock-tracker-c06b5.appspot.com",
    messagingSenderId: "976328436296",
    appId: "1:976328436296:web:5ae4cecf0a642acf41467d"
  };


const app= initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db