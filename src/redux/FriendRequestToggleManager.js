import { createSlice } from "@reduxjs/toolkit";

let FriendRequestToggleManager = createSlice({
    name: "FriendRequestToggleManager",
    initialState: {
        value: {
            status: -2
        }

    },
    reducers: {
        toggleFriendRequestTrayView: (state, action) => {
            console.log(state.value.status)
            if (state.value.status <= 0) state.value.status = 1
            else state.value.status = 0

        },
        closeFriendRequestTrayView: (state, action) => {
            if (state.value.status === 1)
                state.value.status = 0

        },
    }

})

export const { toggleFriendRequestTrayView, closeFriendRequestTrayView } = FriendRequestToggleManager.actions

export default FriendRequestToggleManager.reducer 