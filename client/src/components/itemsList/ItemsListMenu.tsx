import React, { FC } from 'react'
import { DocumentPlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Tooltip } from 'react-tooltip'

export type ItemsListContainerProps = {
    onAddItemClick: () => void,
    onEditItemClick: () => void,
    onDeleteItemClick: (id: string) => void,
    selectedItem: {id: string}   
}

export const ItemsListMenu: FC<ItemsListContainerProps> = ({onAddItemClick, onEditItemClick, onDeleteItemClick, selectedItem}) => {

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
                    onClick={() => onDeleteItemClick(selectedItem.id)}
                    disabled={selectedItem.id === ''}
                    data-tooltip-id="items-list-menu-tooltip"
                    data-tooltip-content="Удалить"
                >
                    <TrashIcon className='tw-w-5 tw-h-5' aria-hidden='true'/>
                </button>
            </div>
            <Tooltip id="items-list-menu-tooltip" place="top"/>
        </div>
    )
}