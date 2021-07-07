import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/API";
import { toast } from "react-toastify";

export const LoadAllUser = createAsyncThunk("user/LoadAllUser", async () => {
  const res = await axios.get(`${API_URL}/user/getall`);
  return res.data;
});

// toggle follow , backend
export const ToggleFollowBtn = createAsyncThunk(
  "user/ToggleFollowBtn",
  async (visiterUserId, { fulfillWithValue, rejectWithValue }) => {
    try {
      toast("Uploading Followers!", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.put(`${API_URL}/user`, { visiterUserId });
      console.log(data);
      if (data.success) {
        return fulfillWithValue({ user: data.user, visitUser: data.visitUser });
      }
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

// edit profile
export const UpdateProfile = createAsyncThunk(
  "user/UpdateProfile",
  async ({ name, bio, imgUrl }, { fulfillWithValue, rejectWithValue }) => {
    try {
      toast("Updating Profile!", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.post(`${API_URL}/user`, {
        name: name,
        bio: bio,
        image: imgUrl,
      });
      console.log(data);
      if (data.success) {
        return fulfillWithValue(data.user);
      }
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

// user Slice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "",
  },
  reducers: {
    startLoadingUsers: (state) => {
      state.status = "loading";
    },
  },
  extraReducers: {
    [LoadAllUser.fulfilled]: (state, action) => {
      state.users = action.payload.user;
      state.status = "fulfilled";
    },
    [LoadAllUser.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    },
    [ToggleFollowBtn.fulfilled]: (state, action) => {
      const followByUserIndex = state.users.findIndex(
        (user) => user._id === action.payload.user._id
      );
      const followedToUserIndex = state.users.findIndex(
        (user) => user._id === action.payload.visitUser._id
      );
      state.users[followByUserIndex] = action.payload.user;
      state.users[followedToUserIndex] = action.payload.visitUser;
    },
    [ToggleFollowBtn.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    },
    // update profile
    [UpdateProfile.fulfilled]: (state, action) => {
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    [UpdateProfile.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action);
    },
  },
});

export const { startLoadingUsers } = userSlice.actions;
export default userSlice.reducer;
