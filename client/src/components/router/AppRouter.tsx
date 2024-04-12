import React, {FC} from 'react'
import {Routes, Route} from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes } from './routers'
import { ErrorPage } from '../../pages/ErrorPage'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../../store/store'

export const AppRouter: FC = () => {
    const AppSelector: TypedUseSelectorHook<RootState> = useSelector
    const isAuth = AppSelector<Boolean>(state => state.user.isAuth)

    return (
        <Routes>
            { isAuth && 
                authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
            )}
            { publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            { isAuth &&
                adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path='*' element={<ErrorPage/>} />
        </Routes>
    )
}