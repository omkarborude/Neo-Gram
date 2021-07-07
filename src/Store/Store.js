import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../Components/Auth/AuthSlice";
import PostSliceReducer from "../Components/Post/PostSlice";
import userSliceReducer from "../Components/User/UserSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    post: PostSliceReducer,
    users: userSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
