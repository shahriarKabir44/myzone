import { createSlice } from "@reduxjs/toolkit";
let homeMenuSelection = createSlice({
    name: "homeMenuSelection",
    initialState: {
        value: {
            toggleHandler: null,
            toggleStatus: 0
        }
    },
    reducers: {
        setToggleFunction: (state, action) => {

            state.value.toggleHandler = action.payload
        },
        setToggleStatus: (status, action) => {
            status.value.toggleStatus = action.payload
        }
    }

})

export const { setToggleFunction, setToggleStatus } = homeMenuSelection.actions

export default homeMenuSelection.reducer 