import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openDialog: false,
    message: '',
    variant: '',
}
const slice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        showMessage(state, action) {
            state.openDialog = true
            const { message, variant } = action.payload
            state.message = message
            state.variant = variant
        },
        clearMessage(state) {
            state.openDialog = false
            state.message = ''
            state.variant = ''
        },
    },
})

// Reducer
export default slice.reducer;

// Actions
export const {showMessage, clearMessage} = slice.actions