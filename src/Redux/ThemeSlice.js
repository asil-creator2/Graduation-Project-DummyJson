import { createSlice } from "@reduxjs/toolkit";
import { FiSun, FiMoon } from "react-icons/fi";

const initialState = {
    state: 'light',
    icon: FiSun
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.state === 'light') {
                state.state = 'dark';
                state.icon = FiMoon;
            } else {
                state.state = 'light';
                state.icon = FiSun;
            }
        },
        setTheme: (state, action) => {
            state.state = action.payload;
            state.icon = action.payload === 'dark' ? FiMoon : FiSun;
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;