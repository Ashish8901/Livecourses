import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Add announcement

export const addAnnouncement = createAsyncThunk(
  "announcement/addAnnouncement",
  async ({ formData, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/announcements`,
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

//edit announcement

export const editAnnouncement = createAsyncThunk(
  "announcement/editAnnouncement",
  async ({ formData, token, id }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/announcements/${id}`,
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

// Fetch All Announcements

export const getAllAnnouncements = createAsyncThunk(
  "announcement/getAllAnnouncements",
  async ({ limit, pageNumber, keyword }) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/announcements`,

        {
          params: params,
        }
      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

// Fetch Single Blog

export const getSingleAnnouncement = createAsyncThunk(
  "announcement/getSingleAnnouncement",
  async ({ id }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/announcements/${id}`,

      );
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

//delete Blog

export const deleteAnnouncement = createAsyncThunk(
  "announcement/deleteAnnouncement",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/announcements/${id}`,
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
  announcementData: {},
  singleAnnouncementData: {},
  error: {},
};

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // GetAllBlogs
    builder.addCase(getAllAnnouncements.pending, (state, { payload }) => {
      state.loading = true;
      state.announcementData = payload;
    });
    builder.addCase(getAllAnnouncements.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.announcementData = payload;
    });
    builder.addCase(getAllAnnouncements.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Single Announcement
    builder.addCase(getSingleAnnouncement.pending, (state, { payload }) => {
      state.loading = true;
      state.singleAnnouncementData = payload;

    });
    builder.addCase(getSingleAnnouncement.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleAnnouncementData = payload;

    });
    builder.addCase(getSingleAnnouncement.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // add Announcement
    builder.addCase(addAnnouncement.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(addAnnouncement.fulfilled, (state, { payload }) => {
      state.loading = false;
      
    });
    builder.addCase(addAnnouncement.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // delete Announcement
    builder.addCase(deleteAnnouncement.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(deleteAnnouncement.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(deleteAnnouncement.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { } = announcementSlice.actions;

export default announcementSlice.reducer;
