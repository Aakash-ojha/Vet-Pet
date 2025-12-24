import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import image from "./assets/Vetpet.jpg";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    setMessage("✅ Registration successful!");

    // Reset form
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });

    // Redirect to homepage after 1.5 seconds
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      {/* Inline CSS for floating placeholders */}
      <style>{`
        .floating-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .floating-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 25px;
          border: 1px solid #ccc;
          outline: none;
          transition: all 0.2s ease;
          font-size: 15px;
          background: none;
        }

        .floating-label {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          color: #666;
          pointer-events: none;
          transition: all 0.2s ease;
          font-size: 15px;
          background-color: white;
          padding: 0 6px;
        }

        .floating-input:focus + .floating-label,
        .floating-input:not(:placeholder-shown) + .floating-label {
          top: 4px;
          left: 16px;
          font-size: 12px;
          color: #007bff;
        }

        .floating-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
        }
      `}</style>

      <div
        className="d-flex justify-content-center align-items-center vh-100"
        // style={{
        //   backgroundImage: `url(${image})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <div
          className="card shadow border-0 p-4"
          style={{
            width: "380px",
            borderRadius: "16px",
            backgroundColor: "rgba(255,255,255,0.95)", // semi-transparent
          }}
        >
          <h4 className="text-center mb-2 fw-bold text-primary">
            🐾 VetPet Register
          </h4>
          <p className="text-center text-muted mb-3">
            Create your account to continue
          </p>

          {message && (
            <div
              className={`alert ${
                message.includes("✅") ? "alert-success" : "alert-danger"
              } text-center py-2`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="floating-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-control floating-input"
                placeholder=" "
              />
              <label className="floating-label">Username</label>
            </div>

            <div className="floating-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control floating-input"
                placeholder=" "
              />
              <label className="floating-label">Email</label>
            </div>

            <div className="floating-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="form-control floating-input"
                placeholder=" "
              />
              <label className="floating-label">Phone Number</label>
            </div>

            <div className="floating-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control floating-input"
                placeholder=" "
              />
              <label className="floating-label">Password</label>
            </div>

            <div className="floating-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-control floating-input"
                placeholder=" "
              />
              <label className="floating-label">Confirm Password</label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-pill fw-semibold py-2"
              style={{
                background: "linear-gradient(90deg, #007bff, #00bfff)",
                border: "none",
              }}
            >
              Register
            </button>
          </form>

          <p
            className="text-center mt-3 text-muted mb-0"
            style={{ fontSize: "0.9rem" }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary fw-semibold text-decoration-none"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
