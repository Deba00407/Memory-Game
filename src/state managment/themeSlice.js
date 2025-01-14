import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDark: false,
    },
    reducers: {
        lightMode: (state) => {
            state.isDark = false;
            document.querySelector("html").classList.remove("dark");
        },
        darkMode: (state) => {
            state.isDark = true;
            document.querySelector("html").classList.add("dark");
        }
    }
});

export const { lightMode, darkMode } = themeSlice.actions;

const themeReducer = themeSlice.reducer;

export default themeReducer;
