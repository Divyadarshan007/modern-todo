import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
export const addTask = createAsyncThunk('addTask', async ({ uid, value }) => {
    try {
        const docRef = await addDoc(collection(db, `${uid}`), {
            ...value,
            status: "pending"
        })
    } catch (error) {
        console.log(error);
    }
    return {
        id: docRef.id,
        ...value
    }
})
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addTask.fulfilled,(state, action)=>{
            state.list.push(action.payload) 
        })
    }
})

export default todoSlice.reducer