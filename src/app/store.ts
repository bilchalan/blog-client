import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { rootApi } from '../features/rootApi';
import authReducer from '../features/auth/slice/authSlice';
import themeReducer from '../features/common/slice/themeSlice';
import { errorNotify } from './error-notify.middleware';

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware, errorNotify),
  devTools: false,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
