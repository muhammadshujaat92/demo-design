import { apiURL } from "@/app/page";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
    items: [],
    status: 'idle',
    error: null
};

export const teamPageData = createAsyncThunk('page/teamPage', async () => {
    const baseUrl = apiURL('team-pages')
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

const teamPageSlice = createSlice({
    name: "teamPage",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(teamPageData.pending, (state) => {
            state.status = 'loading'
        });
        builder.addCase(teamPageData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        builder.addCase(teamPageData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export default teamPageSlice.reducer