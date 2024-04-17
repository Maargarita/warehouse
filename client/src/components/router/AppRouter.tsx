import React, {FC} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes } from './routers'
import { ErrorPage } from '../../pages/ErrorPage'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { UserSliseState } from '../../store/slices/userSlice'
import { paths } from '../../utils/consts'

export const AppRouter: FC = () => {
    const AppSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = AppSelector<UserSliseState>(state => state.user)

  console.log(user);
    
    return (
        <Routes>
            { user.isAuth && 
                authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
            )}
            { publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            { user.isAuth &&
                adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path='*' element={user.isAuth ? <ErrorPage/> : <Navigate to={paths.LOGIN_ROUTE}/>}/>
        </Routes>
    )
}