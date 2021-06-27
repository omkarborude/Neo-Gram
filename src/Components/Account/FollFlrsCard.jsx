import "./following.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToggleFollowBtn } from "../User/UserSlice";

export const FollFlrsCard = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.users).find(
    (user) => user._id === userId
  );
  const CurrentLoginUser = useSelector((state) => state.auth.login);

  const chooseUserWiseBtn =
    CurrentLoginUser?._id === user?._id
      ? "Edit Profile"
      : user?.followers.includes(CurrentLoginUser?._id)
      ? "Following"
      : "Follow";

  const ProfileCardBtnClicked = () => {
    switch (chooseUserWiseBtn) {
      case "Following":
      case "Follow":
        dispatch(ToggleFollowBtn(user._id));
        break;
      case "Edit Profile":
        navigate(`/${user.username}/editprofile`);
        break;
      default:
        break;
    }
  };
  return (
    <div className="user-mini-card">
      <div
        className="user-mini-card-user-info"
        onClick={() => navigate(`/account/${user.username}`)}
      >
        <p>{user.name}</p>
        <span> @{user.username}</span>
      </div>
      <div className="user-mini-card-btn-div">
        <button className="following-btn" onClick={ProfileCardBtnClicked}>
          {chooseUserWiseBtn === "Edit Profile" ? (
            <p>
              {chooseUserWiseBtn}
              <i class="fas fa-user-edit"></i>
            </p>
          ) : chooseUserWiseBtn === "Follow" ? (
            <p>
              {chooseUserWiseBtn} <i class="fas fa-user-plus"></i>
            </p>
          ) : (
            <p>
              {chooseUserWiseBtn}
              <i class="fas fa-user-check"></i>
            </p>
          )}
        </button>
      </div>
    </div>
  );
};
