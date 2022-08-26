import { createSlice } from "@reduxjs/toolkit";
let homeMenuSelection = createSlice({
    name: "homeMenuSelection",
    initialState: {
        value: {

            toggleStatus: -2
        }
    },
    reducers: {
        setToggleStatus: (state, action) => {
            state.value.toggleStatus = action.payload
        },
        toggleLeftMenu: (status, action) => {
            if (status.value.toggleStatus <= 0) status.value.toggleStatus = 1
            else status.value.toggleStatus = 0
        },
        closeLeftMenu: (status, action) => {
            if (status.value.toggleStatus === 1) status.value.toggleStatus = 0

        }
    }

})

export const { toggleLeftMenu, closeLeftMenu, setToggleStatus } = homeMenuSelection.actions

export default homeMenuSelection.reducer 