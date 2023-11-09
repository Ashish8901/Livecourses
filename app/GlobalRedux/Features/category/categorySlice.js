// "use client"; //this is a client side component
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Category
export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async ({ limit, pageNumber, keyword, token }, thunkAPI) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },

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
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ data, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getSingleCategory = createAsyncThunk(
  "category/getSingleCategory",
  async ({ categoryId, token }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// editCategory
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ categoryId, data, token }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);



const initialState = {
  loading: true,
  categoryData: {},
  singleCategoryData: {},
  error: {},
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GetAllBlogs
    builder.addCase(getAllCategory.pending, (state, { payload }) => {
      state.loading = true;
      state.categoryData = payload;
    });
    builder.addCase(getAllCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categoryData = payload;
    });
    builder.addCase(getAllCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // addCategory
    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state) => {
      state.loading = false;
      // Handle the state update upon successful category addition if needed
    });
    builder.addCase(addCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // getSingleCategory
    builder.addCase(getSingleCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleCategory.fulfilled, (state, { payload }) => {
      console.log('API response:', payload);
      state.loading = false;
      state.singleCategoryData = payload;
    });
    builder.addCase(getSingleCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // editCategory
    builder.addCase(editCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editCategory.fulfilled, (state) => {
      state.loading = false;
      // Handle the state update upon successful category edit if needed
    });
    builder.addCase(editCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { } = categorySlice.actions;

export default categorySlice.reducer;
