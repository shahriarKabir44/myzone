import { createSlice } from "@reduxjs/toolkit";
let homeMenuSelection = createSlice({
    name: "homeMenuSelection",
    initialState: { value: 1 },
    reducers: {
        updateNumber: (state, action) => {

            state.value = action.payload
        }
    }

})

export const { updateHomeMenuSelection } = homeMenuSelection.actions

export default homeMenuSelection.reducer 