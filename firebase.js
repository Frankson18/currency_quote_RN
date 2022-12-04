import { initializeApp } from './node_modules/firebase/app';
import { getFirestore, collection, getDoc, addDoc,doc, setDoc,getDocs} from './node_modules/firebase/firestore/lite';
import { getStorage, ref, uploadBytes, getDownloadURL } from './node_modules/firebase/storage';

const config = {
    apiKey: "AIzaSyCC2Gzen9-lGSTn6ZrLN-P2U_5FFCBE58Y",
    authDomain: "ect2525-fd84a.firebaseapp.com",
    projectId: "ect2525-fd84a",
    storageBucket: "ect2525-fd84a.appspot.com",
    messagingSenderId: "603864281324",
    appId: "1:603864281324:web:db052748aa4b1dd5fef5c9",
    measurementId: "G-E98EZ9B2Z3"

};

const app = initializeApp(config);
const db = getFirestore(app);
const storage = getStorage(app, "gs://ect2525-fd84a.appspot.com");

export { db, collection, getDoc, addDoc,doc, setDoc, getDocs, storage, uploadBytes, ref,getDownloadURL }