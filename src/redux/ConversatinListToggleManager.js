import { createSlice } from "@reduxjs/toolkit";

let ConversationListViewToggleManager = createSlice({
    name: "currentUserManager",
    initialState: {
        value: {
            status: -2
        }

    },
    reducers: {
        toggleConversationListView: (state, action) => {
            if (state.value.status <= 0) state.value.status = 1
            else state.value.status = 0

        },
        closeConversationListView: (state, action) => {
            if (state.value.status === 1)
                state.value.status = 0

        },
    }

})

export const { toggleConversationListView, closeConversationListView } = ConversationListViewToggleManager.actions

export default ConversationListViewToggleManager.reducer 