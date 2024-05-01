import React, {FC, useRef, useState} from 'react'
import { ItemsListHeader } from './ItemsListHeader'
import { ItemsList } from './ItemsList'
import { Tooltip } from 'react-tooltip'
import { ItemsListMenu } from './ItemsListMenu'
import { ItemContainer } from './ItemContainer'

export type ItemsListContainerProps = {
    columns: 
        {
            name: string,
            fieldName: string,
            type: string,
            mandatory: boolean
        }[],
    list: {
        id: string
    }[],
    isLoading: boolean
}

export const ItemsListContainer: FC<ItemsListContainerProps> = ({columns, list, isLoading}) => {
    const tableElement = useRef<HTMLTableElement>(null)
    const headerElement = useRef<HTMLDivElement>(null)
    const sectionElement = useRef<HTMLDivElement>(null)
    const [isVerticalScroll, setIsVerticalScroll] = useState(false)
    const [isMinScrollYPosition, setIsMinScrollYPosition] = useState(false)
    const [selectedItem, setSelectedItem] = useState({id: ''})
    const [isOpen, setIsOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)

    const processTableScroll = (element: any) => {
        if (element) {
            if (headerElement.current)
                headerElement.current.scrollLeft = element.scrollLeft
            
            if (sectionElement?.current){
                setIsVerticalScroll((sectionElement.current?.scrollHeight) !== sectionElement?.current?.clientHeight)
                setIsMinScrollYPosition(sectionElement.current.scrollTop === 0)
            }
        }
    }

    const onAddItemClick = () => {
        setIsOpen(true)
        setIsEditMode(false)
    }

    const onEditItemClick = () => {
        setIsOpen(true)
        setIsEditMode(true)
    }

    const onDeleteItemClick = (id: string) => {
        console.log(id)
    }

    const onCloseClick = () => {
        setIsOpen(false)
    }

    return (
        <section className='tw-h-[calc(100vh-7rem)] tw-overflow-hidden tw-bg-white tw-m-4 tw-rounded-md tw-p-2'>
             <div id='items-list-menu' className='tw-flex tw-flex-row tw-items-center tw-bg-white tw-rounded-t-md
                tw-border-b-2 tw-border-gray-400 tw-space-x-1 tw-px-4'>
                <ItemsListMenu
                    onAddItemClick={onAddItemClick}
                    onEditItemClick={onEditItemClick}
                    onDeleteItemClick={onDeleteItemClick}
                    selectedItem={selectedItem}
                />
            </div>
            <ItemsListHeader
                columns={columns}
                tableElement={tableElement}
                headerElement={headerElement}
                isVerticalScroll={isVerticalScroll}
                isMinScrollYPosition={isMinScrollYPosition}
                sectionElement={sectionElement}
            />
            <div ref={sectionElement} className='tw-overflow-auto tw-h-[calc(100%-4rem)]'  onScroll={(e) => processTableScroll(e.target)}>
              <table ref={tableElement} className='tw-w-full tw-text-gray-900 tw-font-medium tw-text-sm'>
                    <ItemsList
                        columns={columns}
                        list={list}
                        setSelectedItem={setSelectedItem}
                        selectedItem={selectedItem}
                    />
                </table>  
            </div>
            <Tooltip className="tw-break-all tw-max-w-lg tw-z-20" id="items-list-tooltip" place="top-start"/>
            <ItemContainer
                isOpen={isOpen}
                onCloseClick={onCloseClick}
                isLoading={isLoading}
                isEditMode={isEditMode}
                columns={columns}
                selectedItem={selectedItem}
            />
        </section>
    )
}