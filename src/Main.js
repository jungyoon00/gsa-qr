import { useNavigate } from "react-router-dom";
import { auth } from "./fbInstance";
import Scanner from "./Scanner";

function Main() {
    // const navigate = useNavigate();
    function onLogoutClick() {
        auth.signOut();
        // navigate("/");
    }

    

    return (
        <>
        <div>Hello</div>
        <div>
            <Scanner />
        </div>
        <button type="button" onClick={onLogoutClick}>Logout</button>
        </>
    );
}

export default Main;