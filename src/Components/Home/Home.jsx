import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { Post } from "../index";
import { useNavigate } from "react-router";
import { ToggleFollowBtn } from "../User/UserSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    toast("Loading Post's!", {
      position: "top-right",
      autoClose: 2000,
    });
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postsData = useSelector((state) => state.post.posts);
  const CurrentLoginUser = useSelector((state) => state.auth.login);
  const users = useSelector((state) => state.users.users);
  const userLogin = useSelector((state) => state.users.users).find(
    (item) => item._id === CurrentLoginUser._id
  );
  const showUsers = users.filter((user) => user?._id != CurrentLoginUser?._id);

  return (
    // Home main div 100%
    <div className="home-main-div">
      {/* home left div 25%  */}
      <div className="home-left-div"></div>

      {/* home middle main div 50% */}
      <div className="home-middle-main-div">
        <div className="home-create-post-tag">
          Create Post :
          <i
            class="fas fa-pen-square"
            onClick={() => navigate("/createpost")}
          ></i>
        </div>
        {postsData
          .slice(0)
          .reverse()
          .map((item) => {
            return <Post postItem={item} key={item?._id} />;
          })}
      </div>

      {/* home right div 25% */}
      <div className="home-right-div">
        <p className="who-to-follow-tag">Who to follow</p>
        {showUsers.map((user) => {
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
                dispatch(ToggleFollowBtn(user?._id));
                break;
              case "Edit Profile":
                navigate(`/${user?.username}/editprofile`);
                break;
              default:
                break;
            }
          };
          if (userLogin?.following?.includes(user._id)) {
            return <p>{}</p>;
          } else {
            return (
              <div className="who-to-follow-user-card">
                <div className="who-to-follow-user">
                  <p>{user?.name}</p>
                  <span>@{user?.username}</span>
                </div>
                <div>
                  {" "}
                  <button
                    className="following-btn"
                    onClick={ProfileCardBtnClicked}
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
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
