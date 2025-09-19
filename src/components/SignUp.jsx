import React, { useState, useEffect } from "react";
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
  const { loading, error, success } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const [msg_error, setError] = useState("");

  useEffect(() => {
    if (success) {
      setError("");
      navigate("/profile");
    }
    if (error) {
      setError(error);
    }
  }, [navigate, success, error]);

  const handleBtn = (param) => {
    navigate(`/${param}`);
  };

  const submitForm = (data) => {
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Password mismatch");
      return
    }
    console.log("data: ", data);
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
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
                {...register("email")}
                required
              />
            </div>
            <div className="email-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Username"
                {...register("username")}
                required
              />
            </div>
            <div className="pass-container ">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Password"
                {...register("password")}
                required
              />
            </div>

            <div className="pass-container ">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                required
              />
            </div>
            {msg_error ? (
              <div className="error-message">
                <p>{msg_error}</p>
              </div>
            ) : null}
            <div>
              <button className="sing-in-btn" type="submit">
                Sing Up{" "}
              </button>
            </div>
            <div className="after-sing-in-btn">
              Don you have an account?{" "}
              <span
                className="sing-up-request"
                onClick={() => handleBtn("login")}
              >
                {loading ? <Spinner /> : "Sign in"}
              </span>
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

export default SignUp;
