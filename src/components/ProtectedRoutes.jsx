import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import SignIn from "../pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/todoSlice";


const ProtectedRoutes = ({ Component }) => {
    const dispatch = useDispatch()
    const user = useSelector((store) => store.todos.currentUser)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            if (u) {
                const { uid, displayName, email } = u
                dispatch(setUser({
                    uid,
                    displayName,
                    email
                })) 
            }
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