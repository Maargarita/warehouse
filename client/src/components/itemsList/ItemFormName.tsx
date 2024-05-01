import React, { FC } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { FieldErrors, FieldValues } from 'react-hook-form'

type ItemFormNameProps ={
    item: 
        {
            name: string,
            fieldName: string,
            type: string,
            mandatory: boolean
        },
    errors: FieldErrors<FieldValues>
}

export const ItemFormName: FC<ItemFormNameProps> = ({item, errors}) => {
    return (
        <>
            <div className='tw-flex tw-flex-row tw-gap-x-2'>
                <span className='tw-inline'>
                    <span>
                       {item.name}
                    </span>
                    &nbsp;
                    <span className='tw-text-red-400'>{item.mandatory ? ' *' : ''}</span> 
                </span>
                <span>
                   {(errors?.data) && <ExclamationCircleIcon className="tw-h-5 tw-w-5 tw-text-red-500" aria-hidden="true"/>}
                </span>
            </div>
        </>
    )
}