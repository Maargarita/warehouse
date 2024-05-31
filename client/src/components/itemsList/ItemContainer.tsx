import React, { FC, Fragment } from 'react'
import { Spinner } from '../Spiner'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { ItemForm } from './ItemForm'

type ItemContainerProps = {
    isOpen: boolean,
    onCloseClick: () => void,
    isLoading: boolean,
    isEditMode: boolean,
    columns: 
        {
            name: string,
            fieldName: string,
            type: string,
            mandatory: boolean,
            createOnly: boolean
        }[],
    selectedItem: {id: string},
    onSubmitClick: (form: object, id: string | null) => void
}

export const ItemContainer: FC<ItemContainerProps> = ({isOpen, onCloseClick, isLoading, isEditMode, columns, selectedItem, onSubmitClick}) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="tw-relative tw-z-10" onClose={onCloseClick}>
                <Transition.Child
                    as={Fragment}
                    enter="tw-ease-in-out tw-duration-500"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in-out tw-duration-500"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity" />
                </Transition.Child>

                <div className="tw-fixed tw-inset-0 tw-overflow-hidden">
                    <div className="tw-absolute tw-inset-0 tw-overflow-hidden">
                        <div className="tw-pointer-events-none tw-fixed tw-inset-y-0 tw-right-0 tw-flex  tw-pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="tw-transform tw-transition tw-ease-in-out tw-duration-500 sm:tw-duration-700"
                                enterFrom="tw-translate-x-full"
                                enterTo="tw-translate-x-0"
                                leave="tw-transform tw-transition tw-ease-in-out tw-duration-500 sm:tw-duration-700"
                                leaveFrom="tw-translate-x-0"
                                leaveTo="tw-translate-x-full"
                            >
                                <Dialog.Panel  className="tw-pointer-events-auto tw-relative tw-w-[90vw]"> 
                                    <Transition.Child
                                        as={Fragment}
                                        enter="tw-ease-in-out duration-500"
                                        enterFrom="tw-opacity-0"
                                        enterTo="tw-opacity-100"
                                        leave="tw-ease-in-out tw-duration-500"
                                        leaveFrom="tw-opacity-100"
                                        leaveTo="tw-opacity-0"
                                    >
                                        <div className="tw-absolute tw-left-0 tw-top-0 tw--ml-8 tw-flex tw-pr-2 tw-pt-4 sm:tw--ml-10 sm:tw-pr-4">
                                        <button
                                            type="button"
                                            className="tw-rounded-md hover:tw-text-gray-300 hover:tw-ring-gray-300 tw-text-white focus:tw-outline-none tw-ring-2 tw-ring-white"
                                            onClick={onCloseClick}
                                        >
                                            <span className="tw-sr-only">Закрыть</span>
                                            <XMarkIcon className="tw-h-6 tw-w-6" aria-hidden="true" />
                                        </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="tw-flex tw-h-full tw-flex-col tw-overflow-y-auto tw-bg-lime-200 tw-p-4 tw-shadow-xl">
                                        {isLoading 
                                            ?   <Spinner/> 
                                            :   <>
                                                    <div className='tw-h-16 tw-w-full tw-text-xl tw-font-bold tw-px-4 tw-py-4 tw-truncate'>
                                                        {isEditMode ? 'Редактирование записи' : 'Новая запись'}
                                                    </div>
                                                    <div id='item-form' className='tw-h-full tw-overflow-hidden'>
                                                        <ItemForm
                                                            onSubmitClick={onSubmitClick}
                                                            isEditMode={isEditMode}
                                                            isLoading={isLoading}
                                                            columns={isEditMode ? columns.filter(item => !item.createOnly) : columns}
                                                            selectedItem={selectedItem}
                                                        />
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}