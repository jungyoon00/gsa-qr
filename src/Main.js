import { useNavigate } from "react-router-dom";
import { auth } from "./fbInstance";
import Scanner from "./Scanner";
import useZustandAuthStore from "./store/zustandAuthStore";
import "./Main.css";

function Main() {
    // const navigate = useNavigate();
    function onLogoutClick() {
        auth.signOut();
        // navigate("/");
    }

    const email = useZustandAuthStore((state) => state.email);
    const photoURL = useZustandAuthStore((state) => state.photoURL);

    return (
        <>
        <div class="account-info">
            {email}
        </div>
        <div>
            <Scanner />
        </div>
        <button type="button" class="logout-btn" onClick={onLogoutClick}>LogOut</button>
        </>
    );
}

export default Main;