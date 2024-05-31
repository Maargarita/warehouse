import React, {FC} from 'react'
import { paths } from '../utils/consts'
import { useNavigate } from 'react-router-dom'

export const ErrorPage: FC = () => {
    const navigate = useNavigate()

    return (
        <section className='tw-h-[100vh] tw-p-4'>
            <div className='tw-h-full tw-flex tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden tw-bg-white tw-rounded-md tw-p-2'>
                <h1 className='tw-font-semibold tw-text-3xl tw-text-green-900 tw-mb-4' >Страница не найдена</h1>
                <button 
                    className='tw-w-32 tw-m-2 tw-rounded-md tw-border-2 tw-px-3 tw-py-1 tw-text-lg tw-font-semibold tw-border-green-900  
                        tw-bg-green-900 tw-text-white hover:tw-bg-green-700 focus-visible:tw-outline focus-visible:tw-outline-2 
                        focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-700' 
                    type='button'
                    onClick={() => navigate(paths.PRODUCTS_ROUTE)}
                >
                    К товарам
                </button>
            </div>
        </section>
    )
}