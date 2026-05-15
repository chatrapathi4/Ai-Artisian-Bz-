
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Navbar } from "./components/Navbar"
import { PrivateRoute } from "./components/PrivateRoute"
import { HomePage } from "./pages/HomePage"
import { Dashboard } from "./pages/Dashboard"
import { MyOrders } from "./pages/MyOrders"
import { MyPayments } from "./pages/MyPayments"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import './App.css'


const GOOGLE_CLIENT_ID = '216160325704-p90c0v8fgmd4i3605mt8d3mavlk9ttv9.apps.googleusercontent.com'

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <PrivateRoute>
                <MyOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/mypayments"
            element={
              <PrivateRoute>
                <MyPayments />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App;