import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import SignIn from "../pages/SignIn";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ Component }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });

        return () => unsubscribe();
    }, []);

    if (!user) {
        return <SignIn />
    }
    if (user) {
         return <Component />;
        }
        
        return <Component />;
};

export default ProtectedRoutes;