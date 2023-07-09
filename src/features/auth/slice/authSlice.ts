import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDto } from '../dtos/user.dto';
import { authApi } from '../api/authApi';
import { RootState } from '../../../app/store';

interface AuthState {
  user: UserDto | null;
}
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, action: PayloadAction<UserDto>) => {
          state.user = action.payload;
        }
      )
      .addMatcher(authApi.endpoints.signOut.matchFulfilled, (state, action) => {
        state.user = null;
      })
      .addMatcher(
        authApi.endpoints.me.matchFulfilled,
        (state, action: PayloadAction<UserDto>) => {
          state.user = action.payload;
        }
      );
  },
});
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
