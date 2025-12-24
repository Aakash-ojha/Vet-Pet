import styles from "./PaymentSection.module.css";
import api from "../../api";
import { useState } from "react";

const PaymentSection = () => {
  const cart_code = localStorage.getItem("cart_code");
  const [loading, setLoading] = useState(false);

  function makePayment() {
    api
      .post("initial_payment/", { cart_code })
      .then((res) => {
        const { payment_url, payment_data } = res.data;

        // Create form element
        const form = document.createElement("form");
        form.method = "POST";
        form.action = payment_url;

        // Append hidden inputs for all payment_data fields
        Object.entries(payment_data).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card || ""}`}>
        <div
          className="card-header"
          style={{ backgroundColor: "#6858DC", color: "white" }}
        >
          <h5 className="mb-0">Payment Options</h5>
        </div>
        <div className="card-body">
          {/* Esewa Button */}
          <button
            onClick={makePayment}
            className={`btn w-100 mb-3 ${styles.esewaButton}`}
            id="esewa-button"
          >
            <i className="bi bi-paypal me-2"></i>
            Pay with Esewa
          </button>

          {/* Bank Button */}
          <button className={`btn w-100 ${styles.bankButton}`} id="bank-button">
            <i className="bi bi-credit-card me-2"></i> Pay with Bank
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
