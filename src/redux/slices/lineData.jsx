import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentLine: {}
}
const slice = createSlice({
    name: 'lineData',
    initialState,
    reducers: {
        saveLine(state, action) {
            state.currentLine = action.payload
        },
    },
})

// Reducer
export default slice.reducer;

// Actions
export const {saveLine} = slice.actions