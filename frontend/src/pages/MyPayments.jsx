
import "../css/MyPayments.css";

const MyPayments = () => {
  const payments = [
    {
      id: 1,
      amount: "₹5,000",
      status: "Paid",
    },
    {
      id: 2,
      amount: "₹2,300",
      status: "Pending",
    },
    {
      id: 3,
      amount: "₹8,700",
      status: "Paid",
    },
  ];

  return (
    <div className="payments-container">
      <div className="payments-card">
        <h1>My Payments 💳</h1>

        <div className="payments-list">
          {payments.map((payment) => (
            <div className="payment-item" key={payment.id}>
              <div>
                <h3>{payment.amount}</h3>
                <p>Transaction ID: #{payment.id}</p>
              </div>

              <span>{payment.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MyPayments;