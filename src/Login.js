import useZustandAuthStore from "./store/zustandAuthStore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./fbInstance";
import "./Login.css";

function Login() {
  const setUsername = useZustandAuthStore((state) => state.setUsername);
  const setEmail = useZustandAuthStore((state) => state.setEmail);
  const handleGoogleSign = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).then((data) => {
      setUsername(data.user.displayName);
      setEmail(data.user.email);
      
      console.log(data);
    }).catch((err) => console.log(err));
  }

  return (
    <div class="container">
      <button class="google-login-btn" onClick={handleGoogleSign}>Login in Google</button>
    </div>
  );
}

export default Login;
