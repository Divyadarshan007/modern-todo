import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db, provider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
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
export const editTask = createAsyncThunk('editTask', async ({ uid, editId, value }) => {
    try {
        await updateDoc(doc(db, `${uid}`, editId), value)
    } catch (error) {
        console.log(error);
    }

})
export const deleteTask = createAsyncThunk('deleteTask', async ({ uid, deleteId }) => {
    try {
        await deleteDoc(doc(db, `${uid}`, deleteId))
    } catch (error) {
        console.log(error);
    }

})
export const signInUser = createAsyncThunk('signInUser', async ({ email, password }) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
        }
    } catch (error) {
        console.log(error);
    }

})
export const signInWithGoogle = createAsyncThunk('signInWithGoogle', async () => {
    try {
        const { user } = await signInWithPopup(auth, provider)
        return {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
        }
    } catch (error) {
        console.log(error);
    }

})
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [],
        currentUser: null
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload
        },
        logout: (state) => {
            signOut(auth);
            state.currentUser = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.list = action.payload
        })

        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
    }
})
export const { setUser, logout } = todoSlice.actions
export default todoSlice.reducer