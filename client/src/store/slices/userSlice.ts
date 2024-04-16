import { createSlice } from "@reduxjs/toolkit";
 
export interface UserObj {
    id: string, 
    login: string,
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
        role: ''
    }
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
    }
})

export const {changeUserAuth, setUser} = userSlice.actions
export default userSlice.reducer