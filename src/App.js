import "./App.css";
import { Route, Routes } from "react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Navbar,
  Landing,
  LoadAllPost,
  CreatePost,
  LoadAllUser,
  Home,
  Account,
  EditProfile,
  Followers,
  Following,
} from "./Components/index";

function App() {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.auth);
  const postData = useSelector((state) => state.post);
  const currentUser = loginData.login;
  useEffect(() => {
    if (currentUser.token) {
      axios.defaults.headers.common["authorization"] = currentUser.token;
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  }, [currentUser]);
  useEffect(() => {
    dispatch(LoadAllPost());
    dispatch(LoadAllUser());
  }, [currentUser]);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account/:username" element={<Account />} />
        <Route path="/:username/editprofile" element={<EditProfile />} />
        <Route path="/:username/following" element={<Following />} />
        <Route path="/:username/followers" element={<Followers />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
