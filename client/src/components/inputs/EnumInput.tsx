import React, { FC, Fragment, MouseEvent, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { columnsProps } from '../itemsList/ItemContainer'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type EnumInputProps = {
    itemList: {}[] | undefined,
    selectedItem: {id: string, name: string},
    onItemChange: (e: any) => void,
    id: string,
    isError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    column: columnsProps,
}

export const EnumInput: FC<EnumInputProps> = ({itemList, selectedItem, onItemChange, id, isError, column}) => {  
    const [top, setTop] = useState(0)
    const [scroll, setScroll] = useState(false)
    const [height, setHeight] = useState<number | undefined>(150)
    const [translateY, setTranslateY] = useState(false)
    const [width, setWidth] = useState(0)

    const onListClick = (e: MouseEvent) => {
        const target = e.currentTarget as any
        const windowE = window.event as any
        setScroll(false)
        setTranslateY(false)
        setHeight(150)
        setTop(windowE.clientY + 10)    
        setWidth(target?.offsetWidth)
        
        let clientTop = windowE.clientY + 10

        setTimeout(() => {
            const documentId: any = document?.getElementById(id)
            if (documentId !== undefined) {
                if(documentId?.offsetHeight > (window.window.innerHeight - clientTop)){
                    setScroll(true)
                    if((window.window.innerHeight - clientTop) < 150){
                        setTranslateY(true)
                        setHeight(150)
                    } else {
                        setHeight(window.window.innerHeight - clientTop)
                    }
                }
            }
        }, 1000)
    }

    return (
        <Listbox value={selectedItem} onChange={onItemChange} as='div' name={id}>
                <Listbox.Button onClick={onListClick} 
                    className={({ open }) =>
                        `${isError ? open ? 'tw-ring-red-400 !tw-ring-2' : 'tw-border-red-400' 
                                        : open ? 'tw-ring-gray-400 !tw-ring-2' : 'tw-border-gray-400'}
                                tw-rounded-md tw-py-1.5 tw-border tw-h-8 tw-pl-2 focus-visible:tw-ring-offset-gray-400
                        tw-relative tw-w-full tw-cursor-default tw-pr-6 tw-text-left focus:tw-outline-none focus-visible:tw-outline-none
                        focus-visible:tw-ring-2 focus-visible:tw-ring-white focus-visible:tw-ring-opacity-75 focus-visible:tw-ring-offset-2 sm:tw-text-sm
                        tw-bg-white'}
                    `}
                >
                    <span className="tw-block tw-truncate">{selectedItem.name}</span>
                    <span className="tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-1">
                        <ChevronUpDownIcon className="tw-h-5 tw-w-5 tw-text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="tw-transition tw-ease-in tw-duration-100"
                    leaveFrom='tw-opacity-100'
                    leaveTo='tw-opacity-0'
                    
                >
                    <Listbox.Options id={id} style={{height: height, top: top, width: width}} className={`${translateY ? 'tw--translate-y-52' : ''} 
                                        tw-fixed tw-z-30 tw-mt-1 tw-max-h-60 tw-overflow-auto tw-rounded-md tw-bg-white tw-py-1 tw-text-base tw-shadow-lg tw-ring-1
                                        tw-ring-black tw-ring-opacity-5 tw-whitespace-break-spaces focus:tw-outline-none sm:tw-text-sm 
                                        ${scroll ? 'tw-overflow-y-scroll' : ''}
                                    `}
                    >
                        {itemList?.map((item, index) => {
                           return <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `tw-relative tw-cursor-default tw-select-none tw-py-2 tw-pl-10 tw-pr-4 
                                    ${ active ? 'tw-bg-gray-500 tw-text-white' : 'tw-text-gray-900' }`
                                }
                                value={item}
                            >
                            {({ selected }) => (
                                <>
                                    <span className={`tw-block ${selected ? 'tw-font-semibold' : 'tw-font-normal' }`}
                                    >
                                        {item[column.optionsNameField as keyof object]}
                                    </span>
                                    {selected ? (
                                        <span className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3">
                                            <CheckIcon className="tw-h-5 tw-w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                </>
                            )}
                            </Listbox.Option>
                        })}
                    </Listbox.Options>
                </Transition>
        </Listbox>
    )
}