import React, {FC, useEffect, useRef, useState} from 'react'
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
    isLoading: boolean,
    isCloseForm: boolean,
    onSubmitClick: (form: object, id: string | null) => void,
    seIsCloseForm: (isClose: boolean) => void,
    onDeleteItem: (id: string) => void
}

export const ItemsListContainer: FC<ItemsListContainerProps> = ({columns, list, isLoading, isCloseForm, onSubmitClick, seIsCloseForm, onDeleteItem}) => {
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
        seIsCloseForm(false)
    }

    const onEditItemClick = () => {
        setIsOpen(true)
        setIsEditMode(true)
        seIsCloseForm(false)
    }

    const onDeleteItemClick = (id: string) => {
        onDeleteItem(id)
    }

    const onCloseClick = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if (isCloseForm) {
            setIsOpen(false)
        }
    }, [isCloseForm])

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
                        onDoubleClick={onEditItemClick}
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
                onSubmitClick={onSubmitClick}
            />
        </section>
    )
}