import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../redux/auth/authActions";
import { useForm } from "react-hook-form";
import "../styles/auth.css";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function ResetPassword() {
  const { loading, error, message, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login", {
          state: { message: "Password reset successful. Please log in." },
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const submitForm = (data) => {
    if (!token) {
      return;
    }
    const { password } = data;
    dispatch(resetPassword({ token, password }));
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Reset Password</h2>
        <p className="auth-text">
          Enter your new password below to reset your account.
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <input
            type="password"
            className="auth-input"
            placeholder="Enter new password"
            {...register("password", {
              required: "A new password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <Spinner /> : "Reset Password"}
          </button>
        </form>
        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
