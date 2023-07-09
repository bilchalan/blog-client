import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

export const errorNotify: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage = action.payload?.data?.message;
      const showSnackbar = (message: string) => {
        enqueueSnackbar(message, { variant: 'error' });
      };
      if (Array.isArray(errorMessage)) {
        const showNextSnackbar = (index: number) => {
          if (index < errorMessage.length) {
            showSnackbar(errorMessage[index]);
            setTimeout(() => showNextSnackbar(index + 1), 300);
          }
        };
        showNextSnackbar(0);
      } else {
        showSnackbar(errorMessage);
      }
    }
    return next(action);
  };
