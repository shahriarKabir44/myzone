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

            state.value.status = action.payload
        },

    }

})

export const { toggleConversationListView } = ConversationListViewToggleManager.actions

export default ConversationListViewToggleManager.reducer 