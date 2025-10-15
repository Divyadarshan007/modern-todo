import { useEffect } from "react"

const Error = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-black h-screen flex  justify-center items-center text-white">Error...</div>

    )
}

export default Error