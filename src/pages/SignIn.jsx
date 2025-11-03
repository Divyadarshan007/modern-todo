import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { signInUser, signInWithGoogle } from "../features/todoSlice"

const SignIn = () => {
    const [input, setInput] = useState({
        email: '', password: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!handleErrors()) return
        try {
            dispatch(signInUser({ email: input.email, password: input.password }))
            toast.success("Loggedin !")
            navigate('/')
        } catch (err) {
            toast.error("Check !")

        }
    }

    const handleErrors = () => {
        if (input.email.trim() === "" || input.password.trim() === "") {
            toast.error('Please fill all inputs !')
            return false
        }
        return true
    }
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#0f0b1a] to-[#1a1630] text-slate-100 flex items-center justify-center px-4">
  <div className="w-full max-w-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
    
    <div className="flex flex-col items-center mb-8">
      <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-[#9e3cd7] to-[#3b9dff] bg-clip-text text-transparent">
        Welcome Back
      </h1>
      <p className="text-slate-400 text-sm mt-1">Sign in to continue your tasks</p>
    </div>


    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm text-slate-300">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
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
          onChange={(e) => setInput({ ...input, [e.target.id]: e.target.value })}
          placeholder="••••••••"
          className="w-full px-4 py-2 rounded-lg bg-transparent border border-[rgba(255,255,255,0.08)] text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#9e3cd7]"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg py-2.5 font-semibold bg-gradient-to-r from-[#3b9dff] to-[#304ffe] hover:opacity-90 transition-all duration-300"
      >
        Sign In
      </button>


      <div className="relative my-6 text-center text-slate-400 text-sm">
        <span className="px-2 bg-[rgba(15,11,26,0.9)] relative z-10">or continue with</span>
        <div className="absolute inset-0 top-1/2 border-t border-[rgba(255,255,255,0.05)]"></div>
      </div>


      <button
        type="button"
        onClick={() => dispatch(signInWithGoogle())}
        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300"
      >
        <svg width={20} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_13183_10121)">
            <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3B82F6"></path>
            <path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006Z" fill="#34A853"></path>
            <path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169Z" fill="#FBBC04"></path>
            <path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805Z" fill="#EA4335"></path>
          </g>
          <defs>
            <clipPath id="clip0_13183_10121">
              <rect width="20" height="20" fill="white" transform="translate(0.5)" />
            </clipPath>
          </defs>
        </svg>
        Continue with Google
      </button>


      <p className="text-sm text-center text-slate-400 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#bd66de] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  </div>
</section>


    )
}

export default SignIn