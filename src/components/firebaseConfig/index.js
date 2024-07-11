import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyDtS-ODpmdjVAAsgbip6KWdFP45FL0dUu8",
        authDomain: "fir-54079.firebaseapp.com",
        databaseURL: "https://fir-54079-default-rtdb.firebaseio.com",
        projectId: "fir-54079",
        storageBucket: "fir-54079.appspot.com",
        messagingSenderId: "51241736057",
        appId: "1:51241736057:web:e741bfffc02473635001a8",
        measurementId: "G-R25GTTDCWT"
      };
      const app = initializeApp(firebaseConfig);

      return getDatabase(app);
}

export default StartFirebase;