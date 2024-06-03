import { configureStore } from "@reduxjs/toolkit"
import userReducer from './slices/userSlice'
import storekeeperReducer from './slices/storekeeperSlice'
import warehouseReducer from './slices/warehouseSlice'
import productReducer from './slices/productSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        storekeeper: storekeeperReducer,
        warehouse: warehouseReducer,
        product: productReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;