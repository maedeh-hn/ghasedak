import {createSlice} from '@reduxjs/toolkit';
import {dispatch} from '../store';
import {getAllLines} from "src/services/lines/lines";

// ----------------------------------------------------------------------

const initialState = {
    lines: [],
};

const slice = createSlice({
    name: 'line',
    initialState,
    reducers: {
        updateLine(state, action) {
            state.lines = action.payload;
        },
    },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getLines() {
    return async () => {
        try {
            const response = await getAllLines()
            dispatch(slice.actions.updateLine(response?.data ?? []));
        } catch (error) {
            console.log(error)
        }
    };
}

export function updateLines(values) {
    return async () => {
        try {
            dispatch(slice.actions.updateLine(values));
        } catch (error) {
            console.log(error)
        }
    };
}
