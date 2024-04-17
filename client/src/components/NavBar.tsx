import React, { FC } from 'react'
import { paths } from '../utils/consts'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { UserObj } from '../store/slices/userSlice'
import { NavLink, useNavigate } from 'react-router-dom'

export const NavBar: FC = () => {
    const AppSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = AppSelector<UserObj>(state => state.user.user)
    const navigate = useNavigate()

    const onLogOutClick = () => {
        localStorage.removeItem('token')
        navigate(paths.LOGIN_ROUTE)
    }

    return (
        <nav id='nav-bar' className="tw-flex tw-flex-row tw-h-16 tw-items-center tw-justify-between tw-px-4 tw-bg-green-900">
            <div className='tw-flex tw-flex-row'>
                <NavLink
                    to={paths.PRODUCTS_ROUTE}
                    className={( {isActive} ) => (`
                        tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-underline tw-rounded-md tw-px-3 tw-py-2
                        ${isActive && 'tw-underline'}
                    `)}
                >
                    Товары
                </NavLink>
                { user.role === 'ADMIN' &&
                    <>
                        <NavLink
                            to={paths.WAREHOUSES_ROUTE}
                            className={( {isActive} ) => (`
                                tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-underline tw-rounded-md tw-px-3 tw-py-2
                                ${isActive && 'tw-underline'}
                            `)}
                        >
                            Склады
                        </NavLink>
                        <NavLink
                            to={paths.USERS_ROUTE}
                            className={( {isActive} ) => (`
                                tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-underline tw-rounded-md tw-px-3 tw-py-2
                                ${isActive && 'tw-underline'}
                            `)}
                        >
                            Пользователи
                        </NavLink>
                        <NavLink
                            to={paths.STOREKEEPERS_ROUTE}
                            className={( {isActive} ) => (`
                                tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-underline tw-rounded-md tw-px-3 tw-py-2
                                ${isActive && 'tw-underline'}
                            `)}
                        >
                            Кладовщики
                        </NavLink>
                    </>
                }
            </div>

            <button
                onClick={onLogOutClick}
                className='tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-bg-green-700 tw-rounded-md tw-px-3 tw-py-2 tw-mr-10
                    tw-border-2 tw-border-white'
            >
                Выйти
            </button>
        </nav>
    )    
}