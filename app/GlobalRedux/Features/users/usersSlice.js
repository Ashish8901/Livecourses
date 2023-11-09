// "use client"; //this is a client side component

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addUser = createAsyncThunk(
  "users/addUser",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        data
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return err.response.data;
    }
  }
);

export const loginUser = createAsyncThunk("users/loginUser", async (data) => {
  try {
    if (data.username) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        data
      );
      document.cookie = `token=${res.data.access_token}`;

      return res.data;
    } else if (data) {
      document.cookie = `token=${data}`;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${data}`,
          },
        }
      );
      return { ...res.data, token: data };
    }
  } catch (err) {
    return err.response.data;
  }
});

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async ({ token, limit, pageNumber, keyword }, thunkAPI) => {
    console.log("token :>> ", token);
    const params = {};
    if (limit) {
      params.limit = limit;
    }
    if (pageNumber) {
      params.page = pageNumber;
    }
    if (keyword) {
      params.keyword = keyword;
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          params: params,

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

// get User by ID

export const getUserbyID = createAsyncThunk(
  "users/getUserbyId",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return err.response.data;
    }
  }
);
// edit User
export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ formData, token }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  }
);

const initialState = {
  loading: true,
  userData: {},
  logInUser: {},
  allUsers: {},
  token: "",
  error: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state, { payload }) => {
      document.cookie = `token=${payload}`;
      state.token = payload;
      state.logInUser = {};
      state.userData = {};
    },
  },

  extraReducers: (builder) => {
    // AddUser
    builder.addCase(addUser.pending, (state, { payload }) => {
      state.loading = true;
      state.userData = payload;
    });
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userData = payload;
    });
    builder.addCase(addUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // EditUser
    builder.addCase(editUser.pending, (state, { payload }) => {
      state.loading = true;
      state.userData = payload;
    });
    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userData = payload;
    });
    builder.addCase(editUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // LoginUser
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.loading = true;
      state.token = payload;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.token = payload.access_token || payload.token;
      state.logInUser = payload.user;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    //getAllUsers
    builder.addCase(getAllUsers.pending, (state, { payload }) => {
      state.loading = true;
      state.allUsers = payload;
    });
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload;
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get One User

    builder.addCase(getUserbyID.pending, (state, { payload }) => {
      state.loading = true;
      state.userData = payload;
    });
    builder.addCase(getUserbyID.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userData = payload;
    });
    builder.addCase(getUserbyID.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
