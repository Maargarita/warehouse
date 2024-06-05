import React, {Dispatch, FC, Fragment, SetStateAction} from 'react'
import { getFieldValue } from '../../utils/functionst'
import { columnsProps } from './ItemContainer';

type ItemsListProps = {
    columns: columnsProps[],
    list: {
        id: string
    }[],
    setSelectedItem: Dispatch<SetStateAction<{ id: string; }>>,
    selectedItem: {id: string},
    onDoubleClick: () => void
}

export const ItemsList: FC<ItemsListProps> = ({columns, list, setSelectedItem, selectedItem, onDoubleClick}) => {
    const defaultColumnSizes = columns.map(() => '150px').join(' ')

    return(
        <tbody className='tw-w-full'>
        {/* невидимая строка для отображения полосы прокрутки, даже если нет записей */}
        {list.length === 0 && 
            <tr 
                style={{
                    display: 'grid', 
                    gridTemplateColumns: defaultColumnSizes,
                    borderBottomWidth: '1px',
                    visibility: 'hidden',
                    pointerEvents: 'none'
                }} 
            ></tr>
        }
        { list.map((item, rowIndex) =>
            <Fragment key={rowIndex}>
                <tr 
                    style={{
                        display: 'grid', 
                        gridTemplateColumns: defaultColumnSizes, 
                        borderBottomWidth: '1px',
                        borderColor: 'rgb(156 163 175)',
                        color: 'black',
                        lineHeight: '1.5rem',
                        height: '1.9rem',
                    }}
                    className={`hover:tw-bg-lime-200 ${selectedItem.id !== '' && item.id === selectedItem.id && 'tw-bg-lime-400'}`}
                    onClick={() => setSelectedItem(item)}
                    onDoubleClick={onDoubleClick}
                >
                    {columns.map((column, colIndex) => {
                        const value = getFieldValue(item[column?.fieldName as keyof object], column.type)
                        return <td 
                                key={colIndex}
                                className='tw-overflow-hidden tw-truncate tw-select-none tw-text-left tw-pl-5 tw-pr-6 tw-py-0.5 tw-text-sm tw-border-r tw-border-gray-400'
                                data-tooltip-id="items-list-tooltip" data-tooltip-content={value?.toString().trim()} data-tooltip-delay-show={1000}
                            >
                                {value}
                            </td>
                        }
                    )}
                </tr>
            </Fragment>
        )}
    </tbody>
    )
}