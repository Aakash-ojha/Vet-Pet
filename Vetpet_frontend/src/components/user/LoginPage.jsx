import { useContext, useState } from "react";
import "./LoginPage.css";
import api from "../../api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const LoginPage = () => {
  const { setIsAuthenticated, get_username } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    const userInfo = {
      username: formData.username,
      password: formData.password,
      phone: formData.phone,
    };

    api
      .post("token/", userInfo)
      .then((res) => {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        setFormData({
          username: "",
          password: "",
          phone: "",
          confirmPassword: "",
        });

        setIsAuthenticated(true);
        toast.success("Login successful!");
        get_username();

        const from = location?.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Login failed. Please check your credentials.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 ">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover={false}
      />

      <div className="login-container items-center">
        <div className="login-card shadow-lg">
          <h2 className="login-title text-center">Join VetPet</h2>
          <p className="login-subtitle text-center mb-3">
            Please sign in to your account
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone number"
                required
                pattern="[0-9]{10}"
              />
            </div>

            {/* Password */}
            <div className="mb-3 password-input-container">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
              />
              <span
                className="showPasswordToggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-3 password-input-container">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirm your password"
                required
              />
              <span
                className="showPasswordToggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </span>
            </div>

            <div className="login-footer mt-1 ">
              <p>
                <a href="#">Forgot Password</a>
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-info w-100 py-2 rounded-pill"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign in "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
