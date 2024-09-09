import { apiURL } from "@/app/page";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
    items: [],
    status: 'idle',
    error: null,
    activeBtn: "Industry experts"
};

export const buttonData = createAsyncThunk('button/navButtons', async () => {
    const baseUrl = apiURL('buttons')
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

const buttonSlice = createSlice({
    name: "button",
    initialState,
    reducers: {
        setActiveBtn: (state, action) => {
            state.activeBtn = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(buttonData.pending, (state) => {
            state.status = 'loading'
        });
        builder.addCase(buttonData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        builder.addCase(buttonData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});

export const { setActiveBtn } = buttonSlice.actions
export default buttonSlice.reducer