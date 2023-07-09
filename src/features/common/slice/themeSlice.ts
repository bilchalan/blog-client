import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

interface ThemeState {
  dark: boolean;
}
const storedDarkValue = localStorage.getItem('dark');
const initialThemeState: ThemeState = {
  dark: storedDarkValue !== null ? JSON.parse(storedDarkValue) : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    changeTheme: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
      localStorage.setItem('dark', JSON.stringify(action.payload));
    },
  },
});
export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme;
export default themeSlice.reducer;
