import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getWarehousesList, createWarehouse, editWarehouse, removeWarehouse } from "../../http/warehouseAPI"
import { RootState } from "../store"
import { toast } from "react-toastify"

export const fetchWarehouses = createAsyncThunk<FetchWarehousesProps, {field: string, order: string}, {rejectValue: string}>(
    'warehouse/fetchWarehouses',
    async function(params, {rejectWithValue}) {
      try {
        const response = await getWarehousesList(params.field, params.order)
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
    }
)

export const addWarehouse = createAsyncThunk<WarehouseObj, object, {rejectValue: string}>(
  'warehouse/createWarehouse',
  async function(formData: object, {rejectWithValue}) {
      try {
        const response = await createWarehouse(formData)
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const changeWarehouse = createAsyncThunk<WarehouseObj, changeWarehouseParams,{rejectValue: string}>(
  'warehouse/editWarehouse',
  async function(data, {rejectWithValue}) {
      try {
        const response = await editWarehouse(data)
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const deleteWarehouse = createAsyncThunk<any, string,{rejectValue: string}>(
  'warehouse/deleteWarehouse',
  async function(id, {rejectWithValue}) {
      try {
        await removeWarehouse(id)
        return id
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)
export interface changeWarehouseParams {
  formData: object, 
  id: string
}

interface FetchWarehousesProps {
    count: number,
    rows: WarehouseObj[]
}

export interface WarehouseObj {
    id: string, 
    address: string,
    total_capacity: string,
    occupied: string, 
    createdAt?: string,
    updatedAt?: string
}

export interface WarehouseSliseState {
    isLoading: boolean,
    isCloseForm: boolean,
    warehousesList: WarehouseObj[],
    count: number
}

const initialState: WarehouseSliseState = {
    isLoading: false,
    isCloseForm: false,
    warehousesList: [],
    count: 0
};  

const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        seIsCloseForm(state, action) {
          state.isCloseForm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWarehouses.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchWarehouses.fulfilled, (state, action) => {
          state.isLoading = false
          state.warehousesList = action.payload.rows
          state.count = action.payload.count
        })
        .addCase(fetchWarehouses.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (addWarehouse.pending, (state) => {
          state.isLoading = true
        })
        .addCase (addWarehouse.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.warehousesList.push(action.payload)
          toast.success('Склад успешно создан', { position: "top-center"})
        })
        .addCase (addWarehouse.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (changeWarehouse.pending, (state) => {
          state.isLoading = true
        })
        .addCase (changeWarehouse.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.warehousesList = state.warehousesList.map(warehouse => {
            if (warehouse.id === action.payload.id) {
              return action.payload
            }

            return warehouse
          })
          
          toast.success('Информация о складе успешно изменена', { position: "top-center"})
        })
        .addCase (changeWarehouse.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (deleteWarehouse.pending, (state) => {
          state.isLoading = true
        })
        .addCase (deleteWarehouse.fulfilled, (state, action) => {
          state.warehousesList = state.warehousesList.filter(warehouse => warehouse.id !== action.payload)
          state.isLoading = false
          toast.success('Склад успешно удален', { position: "top-center"})
        })
        .addCase (deleteWarehouse.rejected, (state) => {
          state.isLoading = false
        })
    }
})

export const selectWarehouse = (state: RootState) => state.warehouse
export const {seIsCloseForm} = warehouseSlice.actions
export default warehouseSlice.reducer