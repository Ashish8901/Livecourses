"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/users/usersSlice";
import blogReducer from "./Features/blogs/blogsSlice";
import courseReducer from "./Features/courses/courseSlice";
import categoryReducer from "./Features/category/categorySlice";
import discussionReducer from "./Features/discussion/discussionSlice";
import settingReducer from "./Features/settings/settingSlice";
import announcementReducer from "./Features/announcements/announcementSlice";
import orderReducer from "./Features/orders/orderSlice"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  //add all your reducers here
  user: userReducer,
  blogs: blogReducer,
  courses: courseReducer,
  category: categoryReducer,
  discussion: discussionReducer,
  settings: settingReducer,
  announcement: announcementReducer,
  order:orderReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
