import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateSettings = createAsyncThunk(
    "settings/updateSettings",
    async ({ formData, token }, thunkAPI) => {
        try {
            const response = await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const getSettings = createAsyncThunk(
    "settings/getSettings",

    async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/settings`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Initial state
const initialState = {
    loading: false,
    settingsData: null,
    error: null,
};

// Slice
const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSettings.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.settingsData = payload;
            })
            .addCase(updateSettings.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || "Failed to update settings";
            })
            .addCase(getSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSettings.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.settingsData = payload;
            })
            .addCase(getSettings.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message || "Failed to fetch settings";
            })
    },
});

export default settingsSlice.reducer;
