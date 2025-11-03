import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/ProtectedRoutes"
import ErrorPage from "./components/ErrorPage"



const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<ProtectedRoutes Component={Home} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

