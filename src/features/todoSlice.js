import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
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
export const fetchTask = createAsyncThunk('fetchTask', async (uid) => {
    try {
        const { docs } = await getDocs(collection(db, `${uid}`))
        const allTask = docs.map((task) => {
            return {
                id: task.id,
                ...task.data()
            }
        })
        return allTask
    } catch (error) {
        console.log(error);
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
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.list = action.payload
        })
    }
})

export default todoSlice.reducer