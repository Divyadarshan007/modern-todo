import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import { Toaster } from "react-hot-toast"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Error from "./components/Error"


const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<ProtectedRoutes Component={Home} />} />
        <Route path="/:id" element={<ProtectedRoutes Component={Home} />} />
        {/* <Route path="/signin" element={<ProtectedRoutes Component={SignIn} />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

