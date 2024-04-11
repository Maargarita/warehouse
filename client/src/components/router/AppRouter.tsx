import React, {FC} from 'react'
import {Routes, Route} from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes } from './routers'
import { ErrorPage } from '../../pages/ErrorPage'

export const AppRouter: FC = () => {
    const isAuth = false
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