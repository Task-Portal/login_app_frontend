import Header from "./Header";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/auth/authActions";
import loginImg from "../img/login.png";
import "../styles/login.css";

function Login() {
  const { loading, error, userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      navigate("/profile");
    }
  }, [navigate, userToken]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  const handleBtn = (param) => {
    navigate(`/${param}`);
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
            <div className="login-title">Login</div>
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
            <div className="pass-container">
              <label htmlFor="pass">Password</label>
              <input
                type="password"
                id="pass"
                className="form-input"
                placeholder="Password"
                {...register("password")}
                required
              />
            </div>
            <div
              className="forget-password"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password
            </div>
            {error ? (
              <div className="error-message">
                <p>{error}</p>
              </div>
            ) : null}
            <div>
              <button className="sing-in-btn" type="submit">
                {loading ? <Spinner /> : "Sing In"}
              </button>
            </div>
            <div className="after-sing-in-btn">
              Don’t have account?{" "}
              <span
                className="sing-up-request"
                onClick={() => handleBtn("signup")}
              >
                Sign Up
              </span>
            </div>
          </form>
        </section>
      </article>
    </div>
  );
}

export default Login;
