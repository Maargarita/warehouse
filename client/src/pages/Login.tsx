
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { login } from '../http/userAPI'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { changeUserAuth, setUser } from '../store/slices/userSlice'
import { jwtDecode } from 'jwt-decode'
import { paths } from '../utils/consts'
import { toast } from 'react-toastify'

interface LogInForm {
    login: string;
    password: string;
}

export const LogIn: FC = () => {
    const navigate = useNavigate()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LogInForm>()

    const onSubmitClick = async (form: LogInForm) => {
        const noResponse = setTimeout(() => {
            toast.error('Сервис не отвечает', { position: "top-center" })
        }, 5000)

        try {
            const response = await login(form.login, form.password)
            clearTimeout(noResponse)
            localStorage.setItem('token', response)
            dispatch(setUser(jwtDecode(response)))
            dispatch(changeUserAuth(true))
            navigate(paths.PRODUCTS_ROUTE)
        } catch (error: any) {
            clearTimeout(noResponse)
            toast.error(error.response.data.message, { position: "top-center"})
        }
    }

    return (
        <section id='log-in' className='tw-flex tw-h-screen tw-items-center tw-justify-center tw-px-4 sm:tw-px-6 lg:tw-px-8'>
            <div className='tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-max-w-md tw-space-y-8 tw-bg-white'>
                <div className='tw-mx-12 tw-my-4'>
                    <h2 className='tw-mt-4 tw-text-center tw-text-2xl tw-font-bold tw-tracking-tight tw-text-gray-900'>Авторизация</h2>
                    <form onSubmit={handleSubmit(onSubmitClick)}>
                        <label htmlFor="login" className="tw-block tw-text-sm tw-font-medium tw-mt-4 tw-px-2 tw-text-gray-900">Логин</label>
                        <input 
                            type='text'
                            id='login'
                            placeholder='Введите логин'
                            className={`tw-relative tw-block tw-w-full tw-rounded-md tw-border-0 tw-mt-2 tw-px-2 tw-py-1.5 tw-text-gray-900 
                                        tw-ring-1 tw-ring-inset placeholder:tw-text-gray-400 focus:tw-z-10 
                                        focus:tw-ring-2 focus:tw-ring-inset sm:tw-text-sm sm:tw-leading-6
                                        focus-visible:tw-outline-none focus-visible:tw-ring-2
                                        ${errors.login ? 'tw-ring-red-400' : 'tw-ring-gray-400'}
                                    `}
                            {...register('login', { required: true })}
                        />
                        {errors.login && <p className='tw-text-sm tw-font-medium tw-text-red-400 tw-px-2'>Поле является обязательным</p>}
                        <label htmlFor="password"  className="tw-block tw-text-sm tw-font-medium tw-mt-4 tw-px-2 tw-text-gray-900">Пароль</label>
                        <div className='tw-relative tw-mt-2 tw-rounded-md tw-shadow-sm'>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id = "password"
                                placeholder='Введите пароль...'
                                className={`tw-block tw-w-full tw-rounded-md tw-border-0 tw-py-1.5 tw-pl-2 tw-pr-20 tw-text-gray-900 
                                            tw-ring-1 tw-ring-inset focus:tw-ring-2 focus:tw-ring-inset sm:tw-text-sm sm:tw-leading-6
                                            focus-visible:tw-outline-none focus-visible:tw-ring-2
                                            ${errors.password ? 'tw-ring-red-400' : 'tw-ring-gray-400'}
                                        `}
                                {...register('password', { required: true })}
                            />
                            <div 
                                className='tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 hover:tw-cursor-pointer'
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                { isPasswordVisible 
                                    ?   <EyeSlashIcon className="tw-h-5 tw-w-5 tw-text-gray-400"/>
                                    :   <EyeIcon className="tw-h-5 tw-w-5 tw-text-gray-400"/>
                                }
                            </div>
                        </div>
                        {errors.password && <p className='tw-text-sm tw-font-medium tw-text-red-400 tw-px-2'>Поле является обязательным</p>}
                        <button 
                            className='tw-group tw-relative tw-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-green-900 tw-mx-auto tw-my-6 tw-px-3 
                                        tw-py-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-green-700 focus-visible:tw-outline focus-visible:tw-outline-2 
                                        focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-700'
                            type='submit'
                        >
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}