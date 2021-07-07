import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../index";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export const LoginUser = createAsyncThunk(
  "Auth/LoginUser",
  async ({ username, password }, { fulfillWithValue, rejectWithValue }) => {
    try {
      toast("Loging In!", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.post(
        `https://social-backend.omkarborude8354.repl.co/user/login`,
        {
          username,
          password,
        }
      );
      if (data.success) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

export const SignUpUser = createAsyncThunk(
  "Auth/SignUpUser",
  async (
    { username, name, email, password },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      toast("Signing Up!", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.post(
        `https://social-backend.omkarborude8354.repl.co/user/signup`,
        {
          name,
          username,
          email,
          password,
        }
      );
      if (data) {
        return fulfillWithValue(data.success);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    login: JSON.parse(localStorage.getItem("login")) || {
      token: "",
      _id: "",
      username: "",
    },
    status: "",
    signup: false,
  },
  reducers: {
    logoutBtnPressed: (state) => {
      toast("Logging out !", {
        position: "top-right",
        autoClose: 2000,
      });
      state.login = { token: "", _id: "", username: "" };
      localStorage.clear();
    },
    removeSignup: (state) => {
      state.signup = false;
    },
  },
  extraReducers: {
    [LoginUser.fulfilled]: (state, action) => {
      const token = action.payload.token;
      const decodedTokenValue = jwt_decode(token);
      const loginUserData = {
        token: `Barear ${token}`,
        username: decodedTokenValue.username,
        _id: decodedTokenValue._id,
        name: decodedTokenValue.name,
      };
      localStorage.setItem("login", JSON.stringify(loginUserData));
      state.login = loginUserData;
      state.status = "fulfilled";
    },
    [LoginUser.reject]: (state, action) => {
      state.status = "rejected";
    },
    [SignUpUser.fulfilled]: (state, action) => {
      state.signup = action.payload;
    },
    [SignUpUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { logoutBtnPressed, removeSignup } = AuthSlice.actions;

export default AuthSlice.reducer;
