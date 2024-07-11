import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDs5VTZw5wt8LSRbcKMVW3kEK7XV8pt3fQ",
    authDomain: "acad-easy.firebaseapp.com",
    databaseURL: "https://acad-easy-default-rtdb.firebaseio.com",
    projectId: "acad-easy",
    storageBucket: "acad-easy.appspot.com",
    messagingSenderId: "195865177272",
    appId: "1:195865177272:web:358cfa5366bc34f77dd84d",
    measurementId: "G-VH2FZ4GZ8K",
  };
  const app = initializeApp(firebaseConfig);

  return getDatabase(app);
}

export default StartFirebase;
