import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Add Courses

export const addCourse = createAsyncThunk(
  "course/addCourse",
  async ({ formData, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses`,
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

// edit Course

export const editCourse = createAsyncThunk(
  "course/editCourse",
  async ({ formData, token, id }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      console.log(err.response.data.error);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Fetch All Courses

export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async ({ token, limit, pageNumber, keyword }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses?limit=${limit}&page=${pageNumber}&keyword=${keyword}`,
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

// Fetch One Course

export const getSingleCourse = createAsyncThunk(
  "course/getSingleCourse",
  async ({ token, id }) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
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

// delete Course;

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      console.log(err.response.data.error);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// =================================================================================

//Add Section

export const addSection = createAsyncThunk(
  "section/addSection",
  async ({ data, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/section`,
        data,
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

//get One Section

export const getSingleSection = createAsyncThunk(
  "section/getSingleSection",
  async ({ token, sectionId }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/section/${sectionId}`,
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

//edit Section

export const editSection = createAsyncThunk(
  "section/editSection",
  async ({ data, token, sectionId }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/section/${sectionId}`,
        data,
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

//delete section
export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/section/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      console.log(err.response.data.error);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
// ===========================================================================

// add Chapter
export const addChapter = createAsyncThunk(
  "section/addChapter",
  async ({ formData, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/chapter`,
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
//Get One Chapter

export const getSingleChapter = createAsyncThunk(
  "chapter/getSingleChapter",
  async ({ token, chapterId }, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/chapter/${chapterId}`,
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
//edit Chapter

export const editChapter = createAsyncThunk(
  "chapter/editChapter",
  async ({ formData, token, chapterId }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/chapter/${chapterId}`,
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

export const deleteChapter = createAsyncThunk(
  "chapter/deleteChapter",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/chapter/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      console.log(err.response.data.error);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const getMyCourses = createAsyncThunk(
  "orders/getMyCourses",
  async ({ token }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courses/enrollments/my-enrollments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const initialState = {
  loading: true,
  courses: {},
  singleCourseData: {},
  singleSectionData: {},
  singleChapterData: {},
  myCourses: {},
  error: {},
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // logoutUser: (state, { payload }) => {
    //   state.token = payload;
    // },
  },

  extraReducers: (builder) => {
    // GetAllBlogs
    builder.addCase(getAllCourses.pending, (state, { payload }) => {
      state.loading = true;
      state.courses = payload;
    });
    builder.addCase(getAllCourses.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.courses = payload;
    });
    builder.addCase(getAllCourses.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // Get Single Course
    builder.addCase(getSingleCourse.pending, (state, { payload }) => {
      state.loading = true;
      state.singleCourseData = payload;
    });
    builder.addCase(getSingleCourse.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleCourseData = payload;
    });
    builder.addCase(getSingleCourse.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // add Course
    builder.addCase(addCourse.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(addCourse.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(addCourse.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // get My Course

    builder.addCase(getMyCourses.pending, (state, { payload }) => {
      state.loading = true;
      state.myCourses = payload;
    });
    builder.addCase(getMyCourses.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.myCourses = payload;
    });
    builder.addCase(getMyCourses.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // add Section

    builder.addCase(addSection.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(addSection.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(addSection.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get Single Section

    builder.addCase(getSingleSection.pending, (state, { payload }) => {
      state.loading = true;
      state.singleSectionData = payload;
    });
    builder.addCase(getSingleSection.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleSectionData = payload;
    });
    builder.addCase(getSingleSection.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // edit Section

    builder.addCase(editSection.pending, (state, { payload }) => {
      state.loading = true;
      state.singleSectionData = payload;
    });
    builder.addCase(editSection.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleSectionData = payload;
    });
    builder.addCase(editSection.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // add Chapter
    builder.addCase(addChapter.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(addChapter.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(addChapter.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get Single Chapter

    builder.addCase(getSingleChapter.pending, (state, { payload }) => {
      state.loading = true;
      state.singleChapterData = payload;
    });
    builder.addCase(getSingleChapter.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleChapterData = payload;
    });
    builder.addCase(getSingleChapter.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // edit Chapter

    builder.addCase(editChapter.pending, (state, { payload }) => {
      state.loading = true;
      state.singleChapterData = payload;
    });
    builder.addCase(editChapter.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.singleChapterData = payload;
    });
    builder.addCase(editChapter.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // delete Course
    builder.addCase(deleteCourse.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(deleteCourse.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // delete Section
    builder.addCase(deleteSection.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(deleteSection.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(deleteSection.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // delete Chapter
    builder.addCase(deleteChapter.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(deleteChapter.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(deleteChapter.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = courseSlice.actions;

export default courseSlice.reducer;
