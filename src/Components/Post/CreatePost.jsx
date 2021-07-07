import "./createpost.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PostBtnPressed } from "./PostSlice";

export const CreatePost = () => {
  const [postData, setpostData] = useState("");
  const [image, setImage] = useState("");
  const [imgUrl, setUrl] = useState("");

  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.auth);
  const currentUser = loginData.login;

  const navigate = useNavigate();

  const postHandler = async () => {
    await dispatch(PostBtnPressed({ postData, imgUrl }));
    navigate("/");
  };

  //   upload image with clodinary
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "hofxumay");
    data.append("cloud_name", "dtqacyknm");
    fetch("https://api.cloudinary.com/v1_1/dtqacyknm/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="cratepost-main-div">
      <h1>Create Post</h1>
      <div className="cratepost-text-input-div">
        <textarea
          className="createpost-input"
          placeholder="Enter Post Text here..."
          value={postData}
          onChange={(e) => setpostData(e.target.value)}
        ></textarea>
      </div>
      {/* show uploaded img here*/}
      {imgUrl ? (
        <div className="createpost-uploaded-img-div">
          <img className="createpost-img-show" src={imgUrl} />
        </div>
      ) : (
        <div> </div>
      )}

      <div className="createpost-img-input-div">
        <div className="upload-img-div-left">
          {" "}
          <p>Upload Image Here:</p>
        </div>

        <div className="upload-img-div-right">
          <input
            className="creatpost-upload-img-input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            className="btn-creatpost-upload-img"
            disabled={!image}
            onClick={uploadImage}
          >
            Upload Image <i class="fas fa-cloud-upload-alt"></i>
          </button>
        </div>
      </div>

      <div className="createpost-post-btn-div">
        <button
          className="btn-createpost-post"
          disabled={!postData}
          onClick={() => postHandler()}
        >
          Post <i class="fas fa-rocket"></i>
        </button>
      </div>
    </div>
  );
};
