import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { logoutBtnPressed } from "../Auth/AuthSlice";
import { Post } from "../Post/Post";
import { ToggleFollowBtn } from "../User/UserSlice";
import "./account.css";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Account = () => {
  useEffect(() => {
    toast("Loading!", {
      position: "top-right",
      autoClose: 2000,
    });
  }, []);
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.users).find(
    (item) => item.username === username
  );
  const CurrentLoginUser = useSelector((state) => state.auth.login);
  const ShowUserPost = useSelector((state) => state.post.posts).filter(
    (post) => post.userId === user._id
  );
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
        navigate(`/${username}/editprofile`);
        break;
      default:
        break;
    }
  };

  return (
    //   Profile Card main div
    <div className="profil-main-div">
      {/* // profile card */}
      <div className="profile-card-div">
        {/* profile card user info div */}
        <div className="profile-card-userinfo">
          {/* for Image */}
          <div className="profile-card-user-img-div">
            <img src={user?.image} />
          </div>
          <div className="profile-card-user-info">
            <p className="profile-card-name-tag">{user?.name}</p>
            <span>@{user?.username}</span>
            {/* bio div */}
            <div className="profile-card-bio-div">
              <p>{user?.bio}</p>
            </div>
            {/* Following & Followers  */}
            <div className="profile-card-folfolwing">
              <div className="profile-card-post-no">
                {ShowUserPost?.length}
                <p>Post</p>
              </div>
              <div className="profile-card-followrs">
                {user?.followers.length}
                <p onClick={() => navigate(`/${username}/followers`)}>
                  Followers
                </p>
              </div>
              <div className="profile-card-following">
                {user?.following.length}
                <p onClick={() => navigate(`/${username}/following`)}>
                  Following
                </p>
              </div>
            </div>
            {/* follow or Edit btn  */}
            <div className="foledit-btn-div">
              <button
                onClick={ProfileCardBtnClicked}
                className={
                  chooseUserWiseBtn === "Edit Profile"
                    ? "edit-profile-btn"
                    : chooseUserWiseBtn === "Following"
                    ? "following-btn"
                    : "following-btn"
                }
              >
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
              {CurrentLoginUser?._id === user?._id ? (
                <button
                  className="btn-logout-user"
                  onClick={async () => {
                    await dispatch(logoutBtnPressed());
                    navigate("/");
                  }}
                >
                  LogOut <i class="fas fa-sign-out-alt"></i>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {ShowUserPost.slice(0)
          .reverse()
          .map((item) => {
            return <Post postItem={item} key={item._id} />;
          })}
      </div>
    </div>
  );
};
