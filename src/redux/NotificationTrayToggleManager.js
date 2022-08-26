import { createSlice } from "@reduxjs/toolkit";

let NotificationTrayToggleManager = createSlice({
    name: "NotificationTrayToggleManager",
    initialState: {
        value: {
            status: -2
        }

    },
    reducers: {
        toggleNotificationTrayView: (state, action) => {
            if (state.value.status <= 0) state.value.status = 1
            else state.value.status = 0

        },
        closeNotificationTrayView: (state, action) => {
            if (state.value.status === 1)
                state.value.status = 0

        },
    }

})

export const { toggleNotificationTrayView, closeNotificationTrayView } = NotificationTrayToggleManager.actions

export default NotificationTrayToggleManager.reducer 