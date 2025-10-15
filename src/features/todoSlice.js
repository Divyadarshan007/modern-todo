import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: []
    },
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default todoSlice.reducer