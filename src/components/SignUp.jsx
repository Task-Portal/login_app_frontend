import React, { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
// import React, { useState } from "react";
import loginImg from "../img/login.png";
import "../styles/login.css";
import "../styles/signUp.css";
import { registerUser } from "../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  // redux
  const { loading, error, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/profile");
    }
  }, [navigate, success]);

  const handleBtn = (param) => {
    navigate(`/${param}`);
  };

  const submitForm = (data) => {
    const { confirmPassword, ...userData } = data;

    userData.email = userData.email.toLowerCase();
    dispatch(registerUser(userData));
  };

  return (
    <div>
      <Header isHidden={true} />
      <article className="login-container">
        <section
          className="login-img-container"
          style={{
            backgroundImage: ` url(${loginImg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat,",
            backgroundPosition: "center",
          }}
        ></section>
        <section className="login-form-container">
          <form
            className="login-sub-container"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="login-title">Sign Up</div>
            <div className="email-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Email"
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
            </div>
            <div className="email-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </div>
            <div className="pass-container ">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            <div className="pass-container ">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Password do not match. ",
                })}
              />
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {error ? (
              <div className="error-message">
                <p>{error}</p>
              </div>
            ) : null}
            <div>
              <button className="sing-in-btn" type="submit" disabled={loading}>
                {loading ? <Spinner /> : "Sing Up"}
              </button>
            </div>
            <div className="after-sing-in-btn">
              Don you have an account?
              <button
                type="button"
                className="link-button sing-up-request"
                onClick={() => handleBtn("login")}
              >
                Sign in
              </button>
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

export default SignUp;
