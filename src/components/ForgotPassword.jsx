import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/auth.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/auth/authActions";

import Spinner from "./Spinner";

export default function ForgotPassword() {
  const { loading, error, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    dispatch(forgotPassword(data));
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="arrow-container">
          <button onClick={() => navigate(-1)} className="back-btn">
            &larr;
          </button>
        </div>

        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-text">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <input
            type="email"
            className="auth-input"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <Spinner /> : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
