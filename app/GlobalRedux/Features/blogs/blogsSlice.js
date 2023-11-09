// "use client"; //this is a client side component

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Add Blogs

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async ({ formData, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
        formData,
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

//edit Blog

export const editBlog = createAsyncThunk(
  "blogs/editBlog",
  async ({ formData, token, id }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`,
        formData,
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

// Fetch All Blogs

export const getAllBlogs = createAsyncThunk(
  "blogs/getAllBlogs",
  async ({ limit, pageNumber, keyword }, thunkAPI) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,

        {
          params: params,
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Fetch Single Blog

export const getSingleBlog = createAsyncThunk(
  "blogs/getSingleBlog",
  async ({ token, blog_id }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${blog_id}`,
        {
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

//delete Blog

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`,
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

const initialState = {
  loading: true,
  blogsData: {},
  singleBlogData: {},
  error: {},
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
   
  },

  extraReducers: (builder) => {
    // GetAllBlogs
    builder.addCase(getAllBlogs.pending, (state, { payload }) => {
      state.loading = true;
      state.blogsData = payload;
    });
    builder.addCase(getAllBlogs.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.blogsData = payload;
    });
    builder.addCase(getAllBlogs.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Single Blog
    builder.addCase(getSingleBlog.pending, (state, { payload }) => {
      state.loading = true;
      state.singleBlogData = payload;
    });
    builder.addCase(getSingleBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleBlogData = payload;
    });
    builder.addCase(getSingleBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // add Blog
    builder.addCase(addBlog.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(addBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(addBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // deleteBlog
    builder.addCase(deleteBlog.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(deleteBlog.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = blogSlice.actions;

export default blogSlice.reducer;
