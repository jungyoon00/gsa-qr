import { create } from "zustand";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const sessionData = window.sessionStorage.getItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`);
let displayName = null;
let email = null;
let userImage = null;
let loggedinState = false;

if (sessionData) {
    const userData = JSON.parse(sessionData);
    loggedinState = true;
    displayName = userData.displayName;
    email = userData.email;
    userImage = userData.photoURL;
}

const useZustandAuthStore = create((set) => ({
    isLoggedIn: loggedinState,
    username: displayName,
    email: email,
    id_token: "",
    accessToken: "",
    photoURL: userImage,
    setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
    setUsername: (username) => set(() => ({ username })),
    setEmail: (email) => set(() => ({ email })),
    setIdToken: (id_token) => set(() => ({ id_token })),
    setAccessToken: (accessToken) => set(() => ({ accessToken })),
    setPhotoURL: (photoURL) => set(() => ({ photoURL })),
}));

export default useZustandAuthStore;
