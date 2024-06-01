import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUsersList, createUser, editUser, removeUser } from "../../http/userAPI"
import { RootState } from "../store"
import { toast } from "react-toastify"
 
export const fetchUsers = createAsyncThunk<FetchUsersProps, undefined, {rejectValue: string}>(
    'user/fetchUsers',
    async function(_, {rejectWithValue}) {
      try {
        const response = await getUsersList()
        return response.data
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
    }
)

export const addUser = createAsyncThunk<UserObj, object, {rejectValue: string}>(
  'user/createUser',
  async function(formData: object, {rejectWithValue}) {
      try {
        const response = await createUser(formData);
        return response.data;
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const changeUser = createAsyncThunk<UserObj, changeUserParams,{rejectValue: string}>(
  'user/editUser',
  async function(data, {rejectWithValue}) {
      try {
        const response = await editUser(data)
        return response.data;
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)

export const deleteUser = createAsyncThunk<any, string,{rejectValue: string}>(
  'user/deleteUser',
  async function(id, {rejectWithValue}) {
      try {
        await removeUser(id)
        return id
      } catch (error: any) {
        toast.error(error.response.data.message, { position: "top-center"})
        return rejectWithValue(error.message)
      }
  }
)
export interface changeUserParams {
  formData: object, 
  id: string
}

interface FetchUsersProps {
    count: number,
    rows: UserObj[]
}

export interface UserObj {
    id: string, 
    login: string,
    password: string,
    role: string, 
    createdAt: string,
    updatedAt: string
}

export interface UserSliseState {
    isAuth: boolean,
    user: UserObj,
    isLoading: boolean,
    isCloseForm: boolean,
    usersList: UserObj[],
    count: number
}

const initialState: UserSliseState = {
    isAuth: false,
    user: {
        id: '',
        login: '',
        password: '',
        role: '',
        createdAt: '',
        updatedAt: ''
    },
    isLoading: false,
    isCloseForm: false,
    usersList: [],
    count: 0
};  

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        seIsCloseForm(state, action) {
          state.isCloseForm = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
          state.isLoading = true
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.isLoading = false
          state.usersList = action.payload.rows
          state.count = action.payload.count
        })
        .addCase(fetchUsers.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (addUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase (addUser.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.usersList.push(action.payload)
          toast.success('Пользователь успешно создан', { position: "top-center"})
        })
        .addCase (addUser.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (changeUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase (changeUser.fulfilled, (state, action) => {
          state.isCloseForm = true
          state.isLoading = false
          state.usersList = state.usersList.map(user => {
            if (user.id === action.payload.id) {
              return action.payload
            }

            return user
          })

          toast.success('Информация о пользователе успешно изменена', { position: "top-center"})
        })
        .addCase (changeUser.rejected, (state) => {
          state.isLoading = false
        })

        .addCase (deleteUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase (deleteUser.fulfilled, (state, action) => {
          state.usersList = state.usersList.filter(user => user.id !== action.payload)
          state.isLoading = false
          toast.success('Пользователь успешно удален', { position: "top-center"})
        })
        .addCase (deleteUser.rejected, (state) => {
          state.isLoading = false
        })
    }
})

export const selectUser = (state: RootState) => state.user
export const {changeUserAuth, setUser, seIsCloseForm} = userSlice.actions
export default userSlice.reducer