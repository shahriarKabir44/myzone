import { createSlice } from "@reduxjs/toolkit";
let homeMenuSelection = createSlice({
    name: "homeMenuSelection",
    initialState: { value: null },
    reducers: {
        setToggleFunction: (state, action) => {

            state.value = action.payload
        }
    }

})

export const { setToggleFunction } = homeMenuSelection.actions

export default homeMenuSelection.reducer 