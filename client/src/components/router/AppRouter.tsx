import React, {FC} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { adminRoutes, authRoutes, publicRoutes } from './routers'
import { ErrorPage } from '../../pages/ErrorPage'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/slices/userSlice'
import { paths } from '../../utils/consts'

export const AppRouter: FC = () => {
    const { isAuth } = useSelector(selectUser);
    
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
            <Route path='*' element={isAuth ? <ErrorPage/> : <Navigate to={paths.LOGIN_ROUTE}/>}/>
        </Routes>
    )
}