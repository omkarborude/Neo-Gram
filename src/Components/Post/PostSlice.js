import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import { Navigate, useNavigate } from "react-router";
import { API_URL } from "../../utils/API";

// asyncThunkFor getting All Posts
export const LoadAllPost = createAsyncThunk("post/LoadAllPost", async () => {
  const res = await axios.get(`${API_URL}/post`);

  return res.data;
});

// create Post btn pressed
export const PostBtnPressed = createAsyncThunk(
  "post/PostBtnPressed",
  async ({ postData, imgUrl }, { fulfillWithValue, rejectWithValue }) => {
    try {
      toast("Uploading Post!", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.post(`${API_URL}/post`, {
        description: postData,
        media: imgUrl ? imgUrl : "",
      });

      if (data.success) {
        return fulfillWithValue(data.newPost);
      }
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

// likeBTN Post
export const LikedBtnPressed = createAsyncThunk(
  "post/LikedBtnPressed",
  async ({ postId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      toast("Updating Like!", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.post(`${API_URL}/post/${postId}/like`);
      if (data.success) {
        return fulfillWithValue(data.post);
      }
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

// Comment
export const CommentBtnPressed = createAsyncThunk(
  "post/CommentBtnPressed",
  async ({ postId, comment }, { fulfillWithValue, rejectWithValue }) => {
    try {
      toast("Updating Comment!", {
        position: "top-right",
        autoClose: 2000,
      });
      const { data } = await axios.post(`${API_URL}/post/${postId}/comment`, {
        comment,
      });
      if (data.success) {
        return fulfillWithValue({ comments: data.comments, postId });
      }
    } catch (error) {
      alert(error);
      return rejectWithValue(error);
    }
  }
);

// main slice
export const PostSlice = createSlice({
  name: "Post",
  initialState: {
    posts: [],
    status: "",
  },
  reducers: {
    startLoadingPosts: (state) => {
      state.status = "loading";
    },
  },
  extraReducers: {
    [LoadAllPost.fulfilled]: (state, action) => {
      state.posts = action.payload.posts;
      state.status = "fulfilled";
    },
    [LoadAllPost.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    },
    // About Create Post
    [PostBtnPressed.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload);
    },
    [PostBtnPressed.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action);
    },
    // Like Btn Pressed
    [LikedBtnPressed.fulfilled]: (state, action) => {
      state.posts = state.posts.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    [LikedBtnPressed.rejected]: (state, action) => {
      state.status = "rejected";
      console.log(action.payload);
    },
    // Comment Btn
    [CommentBtnPressed.fulfilled]: (state, action) => {
      state.posts = state.posts.map((item) =>
        item._id === action.payload.postId
          ? {
              ...item,
              comments: action.payload.comments,
            }
          : item
      );
    },
    [CommentBtnPressed.rejected]: (state, action) => {
      state.status = "reject";
      console.log(action.payload);
    },
  },
});

export const { startLoadingPosts } = PostSlice.actions;
export default PostSlice.reducer;
