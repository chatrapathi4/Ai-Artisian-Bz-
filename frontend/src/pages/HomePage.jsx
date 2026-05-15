import '../css/HomePage.css'
import { Link } from 'react-router-dom'
export const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the HomePage</h1>
      <p>This is the home page of our application.</p>
      <Link to="/dashboard">Go to Dashboard</Link>
      <Link to="/myorders">Go to My Orders</Link>
      <Link to="/mypayments">Go to My Payments</Link>
    </div>
  )
}
