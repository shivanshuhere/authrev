import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin: (state, action) => {
            state.user = action.payload;
        },
        register: (state) => {
            state.user = null;
        },
    },
});

export const { register, signin } = userSlice.actions;

export default userSlice.reducer;
