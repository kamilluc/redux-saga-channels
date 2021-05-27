import { createAction, createSlice } from "@reduxjs/toolkit";

export const loggerSlice = createSlice({
    name: "logger",
    initialState: {
        logs: [],
        messages: [],
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        clearLogs: (state) => {
            state.logs = [];
        },
        pushNewLog: (state, action) => {
            state.logs.push(action.payload);
        },
        pushNewMsg: (state, action) => {
            state.messages.push(action.payload);
        },
    },
});

export const generateLog = createAction("logger/generateLog");
export const { clearLogs, pushNewLog, pushNewMsg } = loggerSlice.actions;
export default loggerSlice.reducer;
