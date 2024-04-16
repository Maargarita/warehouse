import React, { FC } from 'react'
import { paths } from '../utils/consts'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { UserObj } from '../store/slices/userSlice'

export const NavBar: FC = () => {
    const AppSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = AppSelector<UserObj>(state => state.user.user)

    return (
        <div id='nav-bar' className="tw-flex tw-flex-row tw-h-16 tw-items-center tw-justify-between tw-px-4 tw-bg-green-900">
            <div className='tw-flex tw-flex-row'>
                <a
                    href={paths.PRODUCTS_ROUTE}
                    className='tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-underline tw-rounded-md tw-px-3 tw-py-2'
                >
                    Товары
                </a>
                { user.role === 'ADMIN' &&
                    <>
                        <a
                            href={paths.WAREHOUSES_ROUTE}
                            className='tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-bg-green-700 tw-rounded-md tw-px-3 tw-py-2'
                        >
                            Склады
                        </a>
                        <a
                            href={paths.USERS_ROUTE}
                            className='tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-bg-green-700 tw-rounded-md tw-px-3 tw-py-2 '
                        >
                            Пользователи
                        </a>
                        <a
                            href={paths.STOREKEEPERS_ROUTE}
                            className='tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-bg-green-700 tw-rounded-md tw-px-3 tw-py-2'
                        >
                            Кладовщики
                        </a>
                    </>
                }
            </div>

            <a
                href={paths.LOGIN_ROUTE}
                className='tw-text-sm tw-font-semibold tw-text-white tw-bg-gren-800 hover:tw-bg-green-700 tw-rounded-md tw-px-3 tw-py-2 tw-mr-10
                    tw-border-2 tw-border-white'
            >
                Выйти
            </a>
        </div>
    )    
}