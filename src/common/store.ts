import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from "../reducers/todo/todoSlice";
import userReducer from "../reducers/user/userSlice";
import appReducer from "../reducers/app/appSlice";
import dtReducer from "../reducers/dtFetch/dtFetchSlice";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
    app: appReducer,
    data: dtReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
