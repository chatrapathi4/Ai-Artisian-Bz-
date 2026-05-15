import '../css/HomePage.css'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Smart Artisan Assistant</h1>
      <p>Track your production, earnings, and get AI-powered insights</p>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}
