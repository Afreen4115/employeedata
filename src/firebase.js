import firebase from 'firebase/compat/app'
import  'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyDuuOczG5CgWJoKnh8RQna5MjCwbW1WDyo",
  authDomain: "react-contact-5b9cd.firebaseapp.com",
  projectId: "react-contact-5b9cd",
  storageBucket: "react-contact-5b9cd.appspot.com",
  messagingSenderId: "434541780761",
  appId: "1:434541780761:web:3d2df29fab5943ec49af88"
};
const firedb=firebase.initializeApp(firebaseConfig);
export default firedb.database().ref();