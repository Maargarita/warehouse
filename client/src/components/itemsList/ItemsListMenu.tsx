import React, { FC, useState } from 'react'
import { DocumentPlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Tooltip } from 'react-tooltip'
import { DialogTab } from '../DialogTab'

export type ItemsListContainerProps = {
    onAddItemClick: () => void,
    onEditItemClick: () => void,
    onDeleteItemClick: (id: string) => void,
    selectedItem: {id: string}   
}

export const ItemsListMenu: FC<ItemsListContainerProps> = ({onAddItemClick, onEditItemClick, onDeleteItemClick, selectedItem}) => {
    const [isOpen, setIsOpen] = useState(false)

    const onDeleteClick = () => {
        setIsOpen(true)   
    }

    const handleDelete = () => {
        setIsOpen(false)
        onDeleteItemClick(selectedItem.id)
    }

    return (
        <div 
            id='items-list-menu'
            className='tw-h-12 tw-w-full tw-flex tw-flex-row tw-justify-end tw-space-x-1 tw-py-2'
        >
            <div className='tw-flex tw-flex-row tw-gap-x-1'>
                <button
                    className='tw-rounded-md tw-p-1.5 tw-text-white tw-bg-green-900 hover:tw-bg-green-700 disabled:tw-bg-gray-400'
                    onClick={onAddItemClick}
                    data-tooltip-id="items-list-menu-tooltip" data-tooltip-content="Создать"
                >
                    <DocumentPlusIcon className='tw-w-5 tw-h-5' aria-hidden='true'/>
                </button>
                <button
                    className='tw-rounded-md tw-p-1.5 tw-text-white tw-bg-green-900 hover:tw-bg-green-700 disabled:tw-bg-gray-400'
                    onClick={onEditItemClick}
                    disabled={selectedItem.id === ''}
                    data-tooltip-id="items-list-menu-tooltip" data-tooltip-content="Редактировать"
                >
                    <PencilSquareIcon className='tw-w-5 tw-h-5' aria-hidden='true'/>
                </button>
                <button
                    className='tw-rounded-md tw-p-1.5 tw-text-white tw-bg-green-900 hover:tw-bg-green-700 disabled:tw-bg-gray-400'
                    onClick={onDeleteClick}
                    disabled={selectedItem.id === ''}
                    data-tooltip-id="items-list-menu-tooltip"
                    data-tooltip-content="Удалить"
                >
                    <TrashIcon className='tw-w-5 tw-h-5' aria-hidden='true'/>
                </button>
            </div>
            <Tooltip id="items-list-menu-tooltip" place="top"/>
            <DialogTab
                title={'Удаление записи'}
                text={'Вы уверены, что хотите удалить эту запись?'}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                dialogTabFunction={handleDelete}
            />
        </div>
    )
}