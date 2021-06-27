import "./landing.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginUser, removeSignup, SignUpUser } from "../Auth/AuthSlice";

export const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showloginsignup, setshowloginsignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  //   using useState instead of FORM
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.login;

  useEffect(() => {
    if (currentUser?.token) {
      navigate("/home");
    }
  }, [currentUser]);

  const loginHandler = async () => {
    await dispatch(LoginUser({ username, password }));
  };
  const SignUpHandler = async () => {
    await dispatch(SignUpUser({ name, username, email, password }));
  };
  return (
    <div className="landing-main-div">
      {/* left div */}
      <div className="landing-left-div">
        <div className="landing-left-tag">
          <h1 className="landing-left-neogram-tag">
            Neo<span>Gram</span>
          </h1>
        </div>
        <div className="landing-left-text-div">
          <h1>Social Media Services</h1>
          <p className="landing-left-text-lorem">
            Morbi id euismod urna. Proin vestibulum finibus ipsum, id fermentum
            velit dictum et. Curabitur sodales ac odio sit amet euismod. Nunc
            sodales lectus ac hendrerit rutrum. Nullam fringilla dictum
            facilisis. Sed varius eros in velit mollis, vitae dictum nisl
            varius. Curabitur ut ante odio. Integer non erat ex.
          </p>
        </div>
      </div>

      {/* right div */}
      {showloginsignup ? (
        <div className="login-card-right-login-div">
          <h1 className="login-card-login-tag">Login</h1>
          <div className="login-card-input-main-div">
            <div className="login-card-input-email-div">
              <input
                placeholder="User Name"
                className="login-card-input-email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-card-input-passowrd-div">
              <input
                placeholder="Password"
                className="login-card-input-passowrd"
                type={!showPassword ? "password" : "text"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                onClick={() => setShowPassword((state) => !state)}
                className="show-password-icon"
              >
                {showPassword ? (
                  <i className="fa fa-eye"></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </a>
            </div>
            <div className="login-card-login-btn-div">
              <button
                className="btn-login-card-login"
                onClick={() => {
                  loginHandler();
                }}
              >
                Login
              </button>
            </div>
            <div>
              <p
                className="login-card-signup"
                onClick={() => setshowloginsignup(false)}
              >
                create new account{" "}
              </p>
            </div>
          </div>
        </div>
      ) : auth.signup ? (
        <div className="after-signupup-div">
          <div className="after-signupup-inner-div">
            {" "}
            <i class="fas fa-praying-hands"></i>
            <h2>Thank You for Signing Up !</h2>{" "}
            <button
              className="btn-after-signup-login"
              onClick={() => {
                dispatch(removeSignup());
                setshowloginsignup(true);
              }}
            >
              Login <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="login-card-right-login-div signup-anim-class">
          <h1 className="login-card-login-tag">Create your Account</h1>
          <div className="login-card-input-main-div">
            <div className="login-card-input-email-div">
              <input
                placeholder="Email"
                className="login-card-input-email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="login-card-input-username-div">
              <input
                placeholder="Name"
                className="login-card-input-username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="login-card-input-username-div">
              <input
                placeholder="User Name"
                className="login-card-input-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="login-card-input-passowrd-div">
              <input
                placeholder="Password"
                className="login-card-input-passowrd"
                type={!showPassword ? "password" : "text"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a
                onClick={() => setShowPassword((state) => !state)}
                className="show-password-icon"
              >
                {showPassword ? (
                  <i className="fa fa-eye"></i>
                ) : (
                  <i className="fa fa-eye-slash"></i>
                )}
              </a>
            </div>
            <div className="login-card-login-btn-div">
              <button
                className="btn-login-card-login"
                onClick={() => {
                  SignUpHandler();
                }}
              >
                SignUp
              </button>
            </div>
            <div>
              <p
                className="login-card-signup"
                onClick={() => setshowloginsignup(true)}
              >
                Have an Account Already?{" "}
              </p>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};
