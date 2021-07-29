import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/API";
import "./post.css";
import { toast } from "react-toastify";

import { CommentBtnPressed, LikedBtnPressed } from "./PostSlice";

export const Post = ({ postItem }) => {
  const [showCommentDiv, setshowCommentDiv] = useState(false);
  const [postCommentData, setpostCommentData] = useState([]);
  const [newCommentData, setnewCommentData] = useState("");

  const user = useSelector((state) => state.users.users);
  const postOwner = user.find((item) => item._id === postItem.userId);
  const currentUser = useSelector((state) => state.auth.login);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${API_URL}/post/${postItem._id}/comment`
      );
      setpostCommentData(data.comments);
    })();
  }, [postItem]);
  return (
    // show post on home div
    <div className="post-card-div">
      <div className="post-card-user-info">
        <div className="post-card-user-img-div">
          <img src={postOwner.image} />
        </div>
        <div className="post-card-username">
          <Link
            to={`/account/${postOwner.username}`}
            className="Link"
            style={{ color: "black" }}
          >
            <p>{postOwner.name}</p>
            <span>@{postOwner.username}</span>
          </Link>
        </div>
      </div>
      {/* post description */}
      <div className="post-card-description">
        <p>{postItem.description}</p>
      </div>
      {/* post image */}
      {postItem.media ? (
        <div className="post-card-img-div">
          <img className="post-card-img" src={postItem.media} />
        </div>
      ) : (
        ""
      )}

      {/* post button div */}
      <div className="post-btns-div">
        <div
          className="like-btn-div"
          onClick={() => {
            dispatch(LikedBtnPressed({ postId: postItem._id }));
          }}
        >
          {postItem.likes.length < 1 ? "" : postItem.likes.length} Like{" "}
          <i
            className={`far fa-thumbs-up ${
              postItem.likes.includes(currentUser._id) ? "like-red" : ""
            }`}
          ></i>
        </div>
        <div
          className="comment-btn-div"
          onClick={() => setshowCommentDiv(!showCommentDiv)}
        >
          {postCommentData?.length < 1 ? "" : postCommentData?.length} Comment's{" "}
          <i class="far fa-comment-dots"></i>
        </div>
        {/* <div className="share-btn-div">
          Share <i class="far fa-share-square"></i>
        </div> */}
      </div>
      {showCommentDiv ? (
        // comment section main div
        <div className="post-card-comment-main-div">
          {postCommentData.map((item) => {
            // console.log(item.comment);
            return (
              // div for each div
              <div className="post-card-comment-div">
                <p>{item.comment}</p>
                <span>@{item.userId.username}</span>
              </div>
            );
          })}
          {/* post comment div */}
          <div className="post-comment-div">
            <input
              placeholder="Write Comment here..."
              className="post-comment-input"
              value={newCommentData}
              onChange={(e) => {
                setnewCommentData(e.target.value);
              }}
            />
            <button
              className="btn-post-comment"
              onClick={async () => {
                await dispatch(
                  CommentBtnPressed({
                    postId: postItem._id,
                    comment: newCommentData,
                  })
                );
                setnewCommentData("");
              }}
            >
              Comment <i class="fas fa-share"></i>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
