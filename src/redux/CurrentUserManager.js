import { createSlice } from "@reduxjs/toolkit";
const stockImageURL = "https://imageio.forbes.com/specials-images/imageserve/6109550f1aa8564670194ad4/Close-up-smiling-businesswoman-holding-computer-tablet--looking-to-side/960x0.jpg?format=jpg&width=960"

let currentUserManager = createSlice({
    name: "currentUserManager",
    initialState: {
        value: {
            id: 1,
            name: "Shahriar Kabir",
            profileImageURL: stockImageURL,
            email: "shahriar@gmail.com"
        }
    },
    reducers: {
        updateUserInfo: (state, action) => {

            state.value = action.payload
        }
    }

})

export const { updateCurrentUser } = currentUserManager.actions

export default currentUserManager.reducer 