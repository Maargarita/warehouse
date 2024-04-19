import React, {FC, useRef, useState} from 'react'
import { ItemsListHeader } from './ItemsListHeader'
import { ItemsList } from './ItemsList'
import { Tooltip } from 'react-tooltip'

export type ItemsListContainerProps = {
    columns: 
        {
            name: string,
            fieldName: string,
            type: string
        }[],
    list: {
        id: string
    }[]
}

export const ItemsListContainer: FC<ItemsListContainerProps> = ({columns, list}) => {
    const tableElement = useRef<HTMLTableElement>(null)
    const headerElement = useRef<HTMLDivElement>(null)
    const sectionElement = useRef<HTMLDivElement>(null)
    const [isVerticalScroll, setIsVerticalScroll] = useState(false)
    const [isMinScrollYPosition, setIsMinScrollYPosition] = useState(false)

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

    return (
        <section className='tw-h-[calc(100vh-7rem)] tw-overflow-hidden tw-bg-white tw-m-4 tw-rounded-md tw-p-2'>
            <ItemsListHeader
                columns={columns}
                tableElement={tableElement}
                headerElement={headerElement}
                isVerticalScroll={isVerticalScroll}
                isMinScrollYPosition={isMinScrollYPosition}
                sectionElement={sectionElement}
            />
            <div ref={sectionElement} className='tw-overflow-auto tw-h-[calc(100%-1rem)]'  onScroll={(e) => processTableScroll(e.target)}>
              <table ref={tableElement} className='tw-w-full tw-text-gray-900 tw-font-medium tw-text-sm'>
                    <ItemsList
                        columns={columns}
                        list={list}
                    />
                </table>  
            </div>
            <Tooltip className="tw-break-all tw-max-w-lg tw-z-20" id="items-list-tooltip" place="top-start"/>
        </section>
    )
}