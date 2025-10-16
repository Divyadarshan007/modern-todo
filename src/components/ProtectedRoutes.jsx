import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import SignIn from "../pages/SignIn";


const ProtectedRoutes = ({ Component }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);

    if (!user) {
        return <SignIn />
    } else {
        return <Component />;
    }
};

export default ProtectedRoutes;