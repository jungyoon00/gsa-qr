import React, { useEffect, useLayoutEffect, useState } from "react";
import useZustandAuthStore from "./store/zustandAuthStore";
import { auth, database } from "./fbInstance";
import Login from "./Login";
import Main from "./Main";


function App() {
  const isLoggedIn = useZustandAuthStore((state) => state.isLoggedIn);
  const username = useZustandAuthStore((state) => state.username);
  const photoURL = useZustandAuthStore((state) => state.photoURL);
  const setPhotoURL = useZustandAuthStore((state) => state.setPhotoURL);
  const setIsLoggedIn = useZustandAuthStore((state) => state.setIsLoggedIn);
  const setUsername = useZustandAuthStore((state) => state.setUsername);
  auth.onAuthStateChanged((user) => {
    if (user) {
      if (!isLoggedIn) setIsLoggedIn(true);
      if (!user.displayName) setUsername(user.displayName || "");
      if (!photoURL) setPhotoURL(user.photoURL);
    } else {
      setIsLoggedIn(false);
      setUsername(null);
      setPhotoURL(null);
    }
  });

  return (
  <>
    {!isLoggedIn && <Login />}
    {isLoggedIn && <Main />}
  </>
  );
}

export default App;
