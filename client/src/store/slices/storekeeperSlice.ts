import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getStorekeepersList, createStorekeeper, editStorekeeper, removeStorekeeper } from "../../http/storekeeperAPI"
import { RootState } from "../store"
import { toast } from "react-toastify"

export const fetchStorekeepers = createAsyncThunk<FetchStorekeepersProps, undefined, {rejectValue: string}>(
    'storekeeper/fetchStorekeepers',
    async function(_, {rejectWithValue}) {
      try {
        const response = await getStorekeepersList()
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
    }
)

export const addStorekeeper = createAsyncThunk<StorekeeperObj, object, {rejectValue: string}>(
  'storekeeper/createStorekeeper',
  async function(formData: object, {rejectWithValue}) {
      try {
        const response = await createStorekeeper(formData);
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const changeStorekeeper = createAsyncThunk<StorekeeperObj, changeStorekeeperParams,{rejectValue: string}>(
  'storekeeper/editStorekeeper',
  async function(data, {rejectWithValue}) {
      try {
        const response = await editStorekeeper(data)
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const deleteStorekeeper = createAsyncThunk<any, string,{rejectValue: string}>(
  'storekeeper/deleteStorekeeper',
  async function(id, {rejectWithValue}) {
      try {
        await removeStorekeeper(id)
        return id
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)
export interface changeStorekeeperParams {
  formData: object, 
  id: string
}

interface FetchStorekeepersProps {
    count: number,
    rows: StorekeeperObj[]
}

export interface StorekeeperObj {
    id: string, 
    surname: string,
    name: string,
    patronymic: string, 
    phone: string, 
    createdAt?: string,
    updatedAt?: string,
    userId: string,
    warehoueseId?: string
}

export interface StorekeeperSliseState {
    isLoading: boolean,
    isCloseForm: boolean,
    storekeepersList: StorekeeperObj[],
    count: number
}

const initialState: StorekeeperSliseState = {
    isLoading: false,
    isCloseForm: false,
    storekeepersList: [],
    count: 0
};  

const storekeeperSlice = createSlice({
    name: 'storekeeper',
    initialState,
    reducers: {
        seIsCloseForm(state, action) {
          state.isCloseForm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStorekeepers.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchStorekeepers.fulfilled, (state, action) => {
          state.isLoading = false
          state.storekeepersList = action.payload.rows
          state.count = action.payload.count
        })
        .addCase(fetchStorekeepers.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (addStorekeeper.pending, (state) => {
          state.isLoading = true
        })
        .addCase (addStorekeeper.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.storekeepersList.push(action.payload)
          toast.success('Кладовщик успешно создан', { position: "top-center"})
        })
        .addCase (addStorekeeper.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (changeStorekeeper.pending, (state) => {
          state.isLoading = true
        })
        .addCase (changeStorekeeper.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.storekeepersList = state.storekeepersList.map(storekeeper => {
            if (storekeeper.id === action.payload.id) {
              return action.payload
            }

            return storekeeper
          })
          
          toast.success('Информация о кладовщике успешно изменена', { position: "top-center"})
        })
        .addCase (changeStorekeeper.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (deleteStorekeeper.pending, (state) => {
          state.isLoading = true
        })
        .addCase (deleteStorekeeper.fulfilled, (state, action) => {
          state.storekeepersList = state.storekeepersList.filter(storekeeper => storekeeper.id !== action.payload)
          state.isLoading = false
          toast.success('Кладовщик успешно удален', { position: "top-center"})
        })
        .addCase (deleteStorekeeper.rejected, (state) => {
          state.isLoading = false
        })
    }
})

export const selectStorekeeper = (state: RootState) => state.storekeeper
export const {seIsCloseForm} = storekeeperSlice.actions
export default storekeeperSlice.reducer