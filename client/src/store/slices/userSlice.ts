import { createSlice } from "@reduxjs/toolkit";
 
export interface UserObj {
    id: string, 
    login: string, 
    password: string,
    role: string
}

export interface UserSliseState {
    isAuth: boolean
    user: UserObj
}

const initialState: UserSliseState = {
    isAuth: false,
    user: {
        id: '',
        login: '',
        password: '',
        role: ''
    }
};  

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserAuth(state, action) {
            state.isAuth = action.payload
        }
    }
})

export const {changeUserAuth} = userSlice.actions
export default userSlice.reducer