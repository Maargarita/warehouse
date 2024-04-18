import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersList } from "../../http/userAPI";
import { RootState } from "../store";
 
export const fetchUsers = createAsyncThunk<FetchUsersProps, {}, {rejectValue: string}>(
    'user/fetchUsers',
    async function(_, {rejectWithValue}) {
      try {
        const response = await getUsersList()
        return response.data
      } catch (error: any) {
        return rejectWithValue(error.message)
      }
    }
)

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
    loading: boolean,
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
    loading: false,
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
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.loading = false
          state.usersList = action.payload.rows
          state.count = action.payload.count
        })
        .addCase(fetchUsers.rejected, (state) => {
          state.loading = false
        })
    }
})

export const selectUser = (state: RootState) => state.user;
export const {changeUserAuth, setUser} = userSlice.actions
export default userSlice.reducer