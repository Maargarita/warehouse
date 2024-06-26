import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'
import { ItemFormName } from './ItemFormName'
import { ItemFormInput } from './ItemFormInput'
import { toast } from 'react-toastify'
import { columnsProps } from './ItemContainer'

type ItemFormProps = {
    onSubmitClick: (form: object, id: string | null) => void,
    isEditMode: boolean,
    isLoading: boolean,
    columns: columnsProps[],
    selectedItem: {id: string}
}

export const ItemForm: FC<ItemFormProps> = ({onSubmitClick, isEditMode, isLoading, columns, selectedItem}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        control
    } = useForm()

    useEffect(() => {
        if (isSubmitting) {
            if (!isValid || Object.keys(errors).length > 0)
                toast.error('Не заполнено обязательное поле или введено некорректное значение!', { position: "top-center" })
        }
    }, [isSubmitting])

    const handleSubmitClick = (form: object) => {
        if (isEditMode)
            onSubmitClick(form, selectedItem.id)
        else 
            onSubmitClick(form, null)
    }

    return (
        <>
            <form className='tw-flex tw-flex-col tw-h-full tw-rounded-md tw-bg-white'>
                <div className='tw-h-12 tw-flex tw-flex-row tw-justify-end tw-items-center tw-border-b-2 tw-border-gray-400 tw-space-x-1 tw-px-4 tw-py-2'>
                    <div className='tw-flex tw-flex-row tw-gap-x-1'>
                        <button
                            className='tw-rounded-md tw-p-1.5 tw-text-white tw-bg-green-900 hover:tw-bg-green-700 disabled:tw-bg-gray-400'
                            onClick={handleSubmit(handleSubmitClick)}
                            disabled={isLoading}
                            data-tooltip-id="item-form-tooltip" data-tooltip-content="Сохранить"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="IconChangeColor" height="20" width="20" fill='currentColor'>
                                <path 
                                    d="M 0,2 C 0,0.9 0.9,0 2,0 h 14 l 4,4 v 14 c 0,1.104569 -0.895431,2 -2,2 L 3.5,19 h 13 V 12.5 H 3.5 V 19 L 18,20 H 2 C 0.8954305,20 0,19.104569 0,18 Z M 5,2 V 8 H 15 V 2 Z m 6,1 h 3 v 4 h -3 z"
                                    id="mainIconPathAttribute"
                                >
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className='tw-grow tw-p-4 tw-overflow-auto'>
                    { columns.map((column, index) => {
                        let isError = errors && errors[column.fieldName]
                        return ((column.fieldName !== 'createdAt' && column.fieldName !== 'updatedAt') &&
                         <div key={index} className="tw-py-2 sm:tw-grid sm:tw-grid-cols-3 sm:tw-gap-4">
                                <dt className="tw-text-sm tw-font-medium tw-text-gray-900 tw-flex tw-flex-row tw-items-center tw-gap-x-4">
                                    <ItemFormName
                                        item={column}
                                        isError={isError}
                                    />
                                </dt>
                                <dd className="tw-mt-1 tw-text-sm tw-text-gray-900 sm:tw-col-span-2 sm:tw-mt-0">
                                    <ItemFormInput
                                        isEditMode={isEditMode}
                                        column={column}
                                        selectedItem={selectedItem}
                                        register={register}
                                        isError={isError}
                                        control={control}
                                    />
                                </dd>
                            </div>
                        )}
                    )}
                </div>
            </form>
            <Tooltip className="tw-break-all tw-max-w-lg tw-z-20" id="item-form-tooltip" place="top-start"/>
        </>                                               
    )
}