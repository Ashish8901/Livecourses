import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//add discussion (question)

export const createQuestion = createAsyncThunk("discussions/createQuestion",

    async ({ data, token }, thunkAPI) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/discussion/question`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            return thunkAPI.fulfillWithValue(res.data);
        } catch (err) {
            return err.response.data;
        }
    }
);

//add answer by question id
export const createAnswer = createAsyncThunk(
    "discussion/createAnswer",
    async ({ data, token }, thunkAPI) => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/discussion/answer`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            return thunkAPI.fulfillWithValue(res.data);
        }
        catch (err) {
            return err.response.data;
        }
    }
)

//get all questions 
export const getAllQuestions = createAsyncThunk(
    "discussion/getAllQuestions",
    async ({ limit, page, token }, thunkAPI) => {
        const params = {};
        if (limit) {
            params.limit = limit;
        }
        if (page) {
            params.page = page;
        }
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/discussion/question`, {
                params: params,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
//get single question
export const getSingleQuestion = createAsyncThunk(
    "discussion/getSingleQuestion",

    async ({ questionId, token }, thunkAPI) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/discussion/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return thunkAPI.fulfillWithValue(res.data);

        } catch (err) {
            return err.response.data;
        }
    }

)

const initialState = {
    loading: true,
    discussionData: {},
    singleDiscussionData: {},
    error: {},
};


const discussionSlice = createSlice({
    name: "discussion",
    initialState,
    reducers: {},
    extraReducers: (builder) => {


        //create question 
        builder.addCase(createQuestion.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(createQuestion.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(createQuestion.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });

        //create answer
        builder.addCase(createAnswer.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(createAnswer.fulfilled, (state, { payload }) => {
            state.loading = false;
        });
        builder.addCase(createAnswer.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });

        //get all questions

        builder.addCase(getAllQuestions.pending, (state, { payload }) => {
            state.loading = true;
            state.discussionData = payload
        })
        builder.addCase(getAllQuestions.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.discussionData = payload
        })
        builder.addCase(getAllQuestions.rejected, (state, { payload }) => {
            state.loading = false;
            state.discussionData = payload
        });


        //get single question
        builder.addCase(getSingleQuestion.pending, (state, { payload }) => {
            state.loading = true;
            state.singleDiscussionData = payload
        })
        builder.addCase(getSingleQuestion.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.singleDiscussionData = payload
        })
        builder.addCase(getSingleQuestion.rejected, (state, { payload }) => {
            state.loading = false;
            state.singleDiscussionData = payload
        });


    },
});
export const { } = discussionSlice.actions;

export default discussionSlice.reducer