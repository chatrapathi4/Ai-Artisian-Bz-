import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./pages/HomePage"
import { Dashboard } from "./pages/Dashboard"
import { MyOrders } from "./pages/MyOrders"
import { MyPayments } from "./pages/MyPayments"
import './App.css'
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/mypayments" element={<MyPayments />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
