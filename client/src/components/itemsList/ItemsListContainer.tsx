import React, {FC, useRef} from 'react'
import { ItemsListHeader } from './ItemsListHeader'

type ItemsListContainerProps = {
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
    return (
        <section className='tw-h-[calc(100vh-7rem)] tw-overflow-hidden tw-bg-white tw-m-4 tw-rounded-md tw-p-2'>
            <table ref={tableElement} className='tw-overflow-auto tw-w-full tw-text-gray-900 tw-font-medium tw-text-sm'>
                <ItemsListHeader
                    columns={columns}
                    tableElement={tableElement}
                />
            </table>
            <div className='tw-overflow-auto tw-h-[calc(100% - 2rem)]'>
                {list.map((item) => 
                    <div key={item.id} className='tw-flex tw-flex-row'>
                        {columns.map((column, index) => 
                            <p key={index}>{item[column.fieldName as keyof object]} |</p>
                        )}
                    </div>
                )}
            </div>        
        </section>
    )
}