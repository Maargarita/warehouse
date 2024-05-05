import React, { FC } from 'react'
import { getFieldValue } from '../../utils/functionst'
import {UseFormRegister, FieldValues, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'

type ItemFormInputProps = {
    isEditMode: boolean,
    column: 
        {
            name: string,
            fieldName: string,
            type: string,
            mandatory: boolean
        },
    selectedItem: {id: string},
    register:  UseFormRegister<FieldValues>,
    isError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

export const ItemFormInput: FC<ItemFormInputProps> = ({isEditMode, column, selectedItem, register, isError}) => {

    return (
        <>
            { column.type === 'int' &&
                <input
                    type='number'
                    defaultValue={0}
                    className={`tw-w-52 tw-rounded-md tw-border-0 tw-px-2 tw-py-1.5 tw-text-gray-900 
                        tw-ring-1 tw-ring-inset focus:tw-ring-2 focus:tw-ring-inset focus:tw-z-10 tw-text-sm focus-visible:tw-outline-none
                        ${isError ? 'tw-ring-red-400 focus-visible:tw-ring-red-400' : 'tw-ring-gray-400 focus-visible:tw-ring-gray-400'}
                    `}
                    {...register(column.fieldName, { 
                        required: column.mandatory, 
                        value: isEditMode ? getFieldValue(selectedItem[column.fieldName as keyof object], column.type) : 0,
                        valueAsNumber: true,
                        validate: (v: any) => !column.mandatory || Number.isInteger(v),
                    })} 
                />
            }
            { column.type === 'float' &&
                <input
                    type='number'
                    defaultValue={0}
                    step={1 / (10 ** 2)}
                    className={`tw-w-52 tw-rounded-md tw-border-0 tw-px-2 tw-py-1.5 tw-text-gray-900 
                            tw-ring-1 tw-ring-inset focus:tw-ring-2 focus:tw-ring-inset focus:tw-z-10 tw-text-sm focus-visible:tw-outline-none
                            ${isError ? 'tw-ring-red-400 focus-visible:tw-ring-red-400' : 'tw-ring-gray-400 focus-visible:tw-ring-gray-400'}
                    `}
                    {...register(column.fieldName, { 
                        required: column.mandatory,
                        value: isEditMode ? getFieldValue(selectedItem[column.fieldName as keyof object], column.type) : 0,
                        valueAsNumber: true,
                        validate: (v: any) => (v - Number(v?.toFixed(2)) === 0),
                    })} 
                />
            }
            { column.type === 'string' &&
                <input
                    type='text'
                    defaultValue={''}
                    className={`tw-w-full tw-h-8 tw-rounded-md tw-border-0 tw-px-2 tw-py-1.5 tw-text-gray-900
                        tw-ring-1 tw-ring-inset focus:tw-ring-2 focus:tw-ring-inset focus:tw-z-10 tw-text-sm
                        focus-visible:tw-outline-none focus-visible:tw-border-gray-600 focus-visible:tw-ring-2 
                        focus-visible:tw-ring-white focus-visible:tw-ring-opacity-75 focus-visible:tw-ring-offset-2
                        ${isError ? 'tw-ring-red-400 focus-visible:tw-ring-offset-red-400' : 'tw-ring-gray-400 focus-visible:tw-ring-offset-gray-400'}
                    `}
                    {...register(column.fieldName, { 
                        required: column.mandatory,
                        value: isEditMode ? getFieldValue(selectedItem[column.fieldName as keyof object], column.type) : "",
                    })} 
                />
            }
        </>
    )
}