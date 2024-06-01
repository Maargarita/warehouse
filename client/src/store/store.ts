import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import storekeeperReducer from './slices/storekeeperSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        storekeeper: storekeeperReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;