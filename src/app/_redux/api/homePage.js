import { apiURL } from "@/app/page";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

export const homePageData = createAsyncThunk('page/homePage', async () => {
    const baseUrl = apiURL('page-contents')
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

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(homePageData.pending, (state) => {
            state.status = 'loading'
        });
        builder.addCase(homePageData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        builder.addCase(homePageData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export default homePageSlice.reducer