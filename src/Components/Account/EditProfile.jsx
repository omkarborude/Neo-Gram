import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { UpdateProfile } from "../User/UserSlice";
import { toast } from "react-toastify";
import "./editprofile.css";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [imgUrl, setUrl] = useState("");

  const [name, setname] = useState("");
  const [bio, setbio] = useState("");

  //   upload image with clodinary
  const uploadImage = () => {
    toast("Uploadig Image!", {
      position: "top-right",
      autoClose: 3000,
    });
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

  const ClickHandler = async () => {
    await dispatch(UpdateProfile({ name, bio, imgUrl }));
    navigate(`/account/${username}`);
  };
  return (
    <div className="edit-profile-card-div">
      <h1>Edit Profile</h1>
      {/* upload img div */}
      <div className="edit-profile-upload-img-div">
        <div className="upl-img-div-left-div">Profile Picture :-</div>
        <div className="upload-img-right-div">
          <input
            className="edit-profile-upload-img-input"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button className="btn-edit-profile-upload-img" onClick={uploadImage}>
            Upload Image
          </button>
        </div>
      </div>
      {/* name div */}
      <div className="edit-profile-upload-img-div">
        <div className="upl-img-div-left-div">name :-</div>
        <div className="edit-name-input-div">
          <input
            className="edit-name-input"
            placeholder="Enter Name here .."
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
      </div>

      {/* bio div */}
      <div className="edit-profile-upload-img-div">
        <div className="upl-img-div-left-div-bio">Bio :-</div>
        <div className="edit-profile-bio-div">
          <textarea
            className="edit-bio-input"
            placeholder="Enter Bio here .."
            type="text"
            value={bio}
            onChange={(e) => setbio(e.target.value)}
          />
        </div>
      </div>

      {/* btn div */}
      <div className="btn-edit-profile-bottom-div">
        <button
          className="btn-edit-profile-cancel"
          onClick={() => navigate(`/account/${username}`)}
        >
          {" "}
          Cancel
        </button>
        <button
          className="btn-edit-profile-submit"
          onClick={() => ClickHandler()}
        >
          {" "}
          Submit
        </button>
      </div>
    </div>
  );
};
