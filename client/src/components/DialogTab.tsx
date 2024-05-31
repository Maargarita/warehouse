import React, {FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type DialogTabProps = {
    title: string,
    text: string,
    setIsOpen: (isOpen: boolean) => void,
    isOpen: boolean,
    dialogTabFunction: () => void,
}

export const DialogTab: FC<DialogTabProps> = ({title, text, setIsOpen, isOpen, dialogTabFunction}) => {

    const dialogTabCloseClick = () => {
        setIsOpen(false)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="tw-relative tw-z-10" onClose={dialogTabCloseClick}>
                <Transition.Child
                    as={Fragment}
                    enter="tw-ease-out tw-duration-300"
                    enterFrom="tw-opacity-0"
                    enterTo="tw-opacity-100"
                    leave="tw-ease-in tw-duration-200"
                    leaveFrom="tw-opacity-100"
                    leaveTo="tw-opacity-0"
                >
                    <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
                </Transition.Child>

                <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
                    <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="tw-ease-out tw-duration-300"
                            enterFrom="tw-opacity-0 tw-scale-95"
                            enterTo="tw-opacity-100 tw-scale-100"
                            leave="tw-ease-in tw-duration-200"
                            leaveFrom="tw-opacity-100 tw-scale-100"
                            leaveTo="tw-opacity-0 tw-scale-95"
                        >
                            <Dialog.Panel className="tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left 
                                                        tw-align-middle tw-shadow-xl tw-transition-all"
                            >
                                <Dialog.Title
                                    as="h3"
                                    className="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900"
                                >
                                    {title}
                                </Dialog.Title>
                                
                                <div className="tw-mt-4">
                                    <p className="tw-text-sm tw-text-gray-500">
                                        {text}
                                    </p>
                                </div>

                                <div className='tw-mt-4 tw-flex tw-justify-center'>
                                    <button 
                                        className='tw-w-32 tw-m-2 tw-rounded-md tw-border-2 tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-border-green-900  
                                            tw-bg-green-900 tw-text-white hover:tw-bg-green-700 focus-visible:tw-outline focus-visible:tw-outline-2 
                                            focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-700' 
                                        type='button'
                                        onClick={dialogTabFunction}
                                    >
                                        Да
                                    </button>
                                    <button 
                                        className='tw-w-32 tw-m-2 tw-rounded-md tw-border-2 tw-px-3 tw-py-1 tw-text-sm tw-font-semibold tw-border-green-900 
                                            tw-text-gray-700 hover:tw-bg-gray-200 focus-visible:tw-outline focus-visible:tw-outline-2 
                                            focus-visible:tw-outline-offset-2 focus-visible:tw-outline-green-600' 
                                        type='button'
                                        onClick={dialogTabCloseClick}
                                    >
                                        Нет
                                    </button>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}