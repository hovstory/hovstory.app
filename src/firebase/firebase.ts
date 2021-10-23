// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBU4JfeZQkpMu6YZbmX53fIn14DxTNooUM",
	authDomain: "hov-story.firebaseapp.com",
	projectId: "hov-story",
	storageBucket: "hov-story.appspot.com",
	messagingSenderId: "947541270266",
	appId: "1:947541270266:web:fde559353f7efa9d2e7343",
	measurementId: "G-Q8MW7RQY6P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { storage };
