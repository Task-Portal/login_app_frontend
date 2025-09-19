import React from "react";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

function Header({ isHidden }) {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleBtn = (param) => {
    navigate(`/${param}`);
  };

  const signOutHandler = ()=>{
    dispatch(logout())
  }

  return (
    <div className="header-container">
      
      <div className={`header-logo ${isHidden ? "hidden" : ""}`}>My Logo</div>
      <div className={`header-btn-container ${isHidden ? "hidden" : ""}`}>
        {userToken ? (
          <button id="sign-up-btn" className="header-btn" onClick={signOutHandler}>
            Sign Out
          </button>
        ) : (
          <>
            <button
              id="login-btn"
              className="header-btn"
              onClick={() => handleBtn("login")}
            >
              Log In
            </button>
            <button
              id="sign-up-btn"
              className="header-btn"
              onClick={() => handleBtn("signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
