import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../Auth/AuthSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./landing.css";

export const GuestLogin = () => {
  const [username, setUsername] = useState("tester");
  const [password, setPassword] = useState("tester");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginHandler = async () => {
    await dispatch(LoginUser({ username, password }));
  };
  return (
    <div className="gues-login-div">
      <button
        className="btn-guest-login"
        onClick={() => {
          loginHandler();
        }}
      >
        Login as guest
      </button>
    </div>
  );
};
