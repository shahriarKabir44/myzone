import { createSlice } from "@reduxjs/toolkit";
let currentUserManager = createSlice({
    name: "currentUserManager",
    initialState: {
        value: null,
        currentlyViewingProfile: {
            Id: 1,
            name: "Shahriar Kabir"
        }
    },
    reducers: {
        updateUserInfo: (state, action) => {

            state.value = action.payload
        },
        updateCurrentlyViewingUser(state, action) {
            state.currentlyViewingProfile = action.payload
        }
    }

})

export const { updateUserInfo, updateCurrentlyViewingUser } = currentUserManager.actions

export default currentUserManager.reducer 