import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { auth } from "../config/firebase";

const Error = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-black h-screen flex justify-center items-center text-white text-3xl">Error...</div>
    )
}

export default Error