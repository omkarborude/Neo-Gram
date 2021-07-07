import "./navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  const currentLoginUser = useSelector((state) => state.auth.login);
  return (
    <div className="nav">
      <Link to="/" className="Link">
        <div className="logo">Neo Gram</div>
      </Link>
      <input type="checkbox" id="click" />
      <label for="click" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>

      <ul>
        {currentLoginUser ? (
          <Link to={`account/${currentLoginUser.username}`} className="Link">
            <li className="account-div">
              <a>
                <i class="fas fa-user-alt"></i>
              </a>
              {currentLoginUser.username
                ? `Hi,${currentLoginUser.username} `
                : "Login"}
            </li>{" "}
          </Link>
        ) : (
          <Link to="/" className="Link">
            <li className="account-div">
              <a>
                <i class="fas fa-user-alt"></i>
              </a>
              Login
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
