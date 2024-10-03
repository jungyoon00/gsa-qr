import getZustandAuthStore from "./store/zustandAuthStore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./fbInstance";

function Login() {
  const setUsername = getZustandAuthStore((state) => state.setUsername);
  const setEmail = getZustandAuthStore((state) => state.setEmail);
  const handleGoogleSign = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((data) => {
      setUsername(data.user.displayName);
      setEmail(data.user.email);
      
      console.log(data);
    }).catch((err) => console.log(err));
  }

  return (
    <div>
      <button onClick={handleGoogleSign}>Login in Google</button>
    </div>
  );
}

export default Login;
