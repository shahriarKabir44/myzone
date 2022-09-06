import { createSlice } from "@reduxjs/toolkit";
const stockImageURL = "https://www.hoyletanner.com/wp-content/uploads/2017/07/img_3416_1-Square-300x300.jpg"
const coverPhotoURL = "https://cdn.vox-cdn.com/thumbor/cMoBp9foDH6ZIHLVpfIzI4AAGNM=/0x0:2000x1288/1200x800/filters:focal(840x484:1160x804)/cdn.vox-cdn.com/uploads/chorus_image/image/65855855/566006899.jpg.0.jpg"
let currentUserManager = createSlice({
    name: "currentUserManager",
    initialState: {
        value: null,
        currentlyViewingProfile: {
            id: 1,
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