import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "../config/firebase"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
const SignUp = () => {

    const [input, setInput] = useState({
        email: '', password: '', cPassword: ''
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!handleErrors()) return
        try {
            await createUserWithEmailAndPassword(auth, input.email, input.password)
            navigate('/')
            toast.success('Created !')
        } catch (err) {
            toast.error('Check !')
        }
    }
    const handleErrors = () => {
        if (input.email.trim() === "" || input.password.trim() === "") {
            toast.error('Please fill all inputs !')
            return false
        }

        if (input.password.trim() !== input.cPassword.trim()) {
            toast.error('Password & confirm-password does not match !')
            return false
        }
        return true
    }
    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0f0b1a] to-[#1a1630] text-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">

                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#9e3cd7] to-[#3b9dff] bg-clip-text text-transparent">
                        Create Your Account
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Join and start managing your tasks easily</p>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm text-slate-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg bg-transparent border border-[rgba(255,255,255,0.08)] text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#9e3cd7]"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm text-slate-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg bg-transparent border border-[rgba(255,255,255,0.08)] text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#9e3cd7]"
                        />
                    </div>

                    <div>
                        <label htmlFor="cPassword" className="block mb-2 text-sm text-slate-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="cPassword"
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg bg-transparent border border-[rgba(255,255,255,0.08)] text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#9e3cd7]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg py-2.5 font-semibold bg-gradient-to-r from-[#3b9dff] to-[#304ffe] hover:opacity-90 transition-all duration-300"
                    >
                        Create Account
                    </button>

                    <p className="text-sm text-center text-slate-400 mt-4">
                        Already have an account?{" "}
                        <Link to="/" className="text-[#bd66de] hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </section>

    )
}

export default SignUp
