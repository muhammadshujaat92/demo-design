import { apiURL } from "@/app/page";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

export const outComePageData = createAsyncThunk('page/outcomePage', async () => {
    const baseUrl = apiURL('outcome-pages')
    try {
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result.data
    } catch (error) {
        console.log(`This is the error ${error}`);
    }
})

const outComeSlice = createSlice({
    name: "outcome",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(outComePageData.pending, (state) => {
            state.status = 'loading'
        });
        builder.addCase(outComePageData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        builder.addCase(outComePageData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export default outComeSlice.reducer