import { ChevronDoubleUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import React, {FC, RefObject, useCallback, useEffect, useState} from 'react'

type ItemsListHeaderProps = {
    columns: {
        name: string,
        fieldName: string,
        type: string
    }[],
    tableElement: RefObject<HTMLTableElement> | null
    headerElement: RefObject<HTMLDivElement> | null,
    isVerticalScroll: boolean,
    isMinScrollYPosition: boolean,
    sectionElement: RefObject<HTMLDivElement> | null
}
export const ItemsListHeader: FC<ItemsListHeaderProps> = ({columns, tableElement, headerElement, isVerticalScroll, isMinScrollYPosition, sectionElement}) => {
    const [sizingColumnIndex, setSizingColumnIndex] = useState(null)
    const [changedValues, setChangedValues] = useState<number[] | null>(null)
    const [offsetX, setOffsetX] = useState(0)
    const defaultColumnSizes = columns.map(() => '150px').join(' ')
    const defaultColumnValues = columns.map(() => 150)

    let sizeValues = changedValues || defaultColumnValues

    const mouseDown = (index: any) => (e: any) => {
        setSizingColumnIndex(index)
        const offset = e.clientX - sizeValues[index]
        setOffsetX(offset)
    }

    const mouseMove = useCallback((e: any) => {
        const minCellWidth = 100

        const gridColumns = columns.map((column, index) => {
            if (index === sizingColumnIndex) {
                const width = e.clientX - offsetX
                if (width >= minCellWidth) {
                    return width
                }
            }
            return sizeValues[index] ? sizeValues[index] : minCellWidth
        })

        sizeValues = gridColumns
        const gridTemplateColumns = `${gridColumns.map(item => item + 'px').join(" ")}`
        if (headerElement?.current)
            headerElement.current.style.gridTemplateColumns = gridTemplateColumns

        tableElement?.current?.childNodes[0].childNodes.forEach(row =>
            (row as HTMLElement).style.gridTemplateColumns = gridTemplateColumns
        )    
    }, [sizingColumnIndex, columns, offsetX])

    const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove)
        window.removeEventListener("mouseup", mouseUp)
    }, [mouseMove])
 
    const mouseUp = useCallback(() => {
        if (tableElement?.current) {
            setChangedValues(sizeValues)
        }
        removeListeners()
        setSizingColumnIndex(null)
        setOffsetX(0)
    }, [setSizingColumnIndex, setOffsetX, removeListeners])

    const onScrollUp = () => {
        if (sectionElement?.current) {
            sectionElement.current.scrollTop = 0
        }
    }

    useEffect(() => {
        if (sizingColumnIndex !== null) {
            window.addEventListener("mousemove", mouseMove)
            window.addEventListener("mouseup", mouseUp)
        }
    
        return () => {
            removeListeners()
        }
    }, [sizingColumnIndex, mouseMove, mouseUp, removeListeners])

    return (
        <div id='table-header' className='tw-w-full tw-flex tw-flex-row tw-h-6 tw-bg-white'>
            <div 
                style={{
                    display: 'grid', 
                    gridTemplateColumns: defaultColumnSizes, 
                    borderBottomWidth: '1px',
                    borderColor: 'rgb(156 163 175)',
                    overflow: 'hidden',
                    flexGrow: '1',
                }}
                ref={headerElement}
            >
                { columns.map(({name, fieldName, type}, index) => 
                    <div
                        key={index}
                        className={`tw-relative tw-group tw-overflow-hidden tw-truncate tw-border-r
                                    tw-text-left tw-text-sm tw-font-semibold tw-pl-5 tw-pr-6 tw-py-0.5 tw-border-gray-400`}
                    >
                        {/* <span
                            className={`tw-absolute tw-left-0 tw-inset-y-auto group-hover:tw-opacity-50 
                                        ${sortingColumn ? sortingColumn === fieldName ? 'tw-opacity-100' : 'tw-opacity-0' : 'tw-opacity-50'}
                                    `}
                            onClick={() => onSortClick(fieldName, type)}
                        >
                            { sortingDirection === 'up'
                                ?   <ChevronUpIcon className='tw-w-5 tw-h-5' aria-hidden='true'/>
                                :   <ChevronDownIcon className='tw-w-5 tw-h-5' aria-hidden='true'/>
                            }
                        </span> */}
                        <span 
                            data-tooltip-id="items-list-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={1000}
                        >
                            {name}
                        </span>
                        <span 
                            className='tw-absolute tw-top-0 tw-right-0 tw-bottom-0 tw-rounded-md tw-w-0.5 tw-cursor-col-resize'
                            onMouseDown={mouseDown(index)}
                        >
                        </span>
                    </div>
                )}
            </div>
            { isVerticalScroll &&
                <button
                    type='button'
                    className='tw-w-4 tw-px-0 tw-py-1 tw-bg-gray-100 hover:tw-bg-gray-300 disabled:tw-text-gray-400 disabled:tw-bg-gray-100'
                    onClick={onScrollUp}
                    disabled={isMinScrollYPosition}
                >
                    <ChevronDoubleUpIcon className='tw-w-4 tw-h-4' aria-hidden='true'/>
                </button>
            }
        </div>
    )
}