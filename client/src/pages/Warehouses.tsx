import React, {FC, useEffect} from 'react'
import { NavBar } from '../components/NavBar'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { addWarehouse, changeWarehouse, deleteWarehouse, fetchWarehouses, seIsCloseForm, selectWarehouse } from '../store/slices/warehouseSlice'

export const Warehouses: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { warehousesList, isLoading, isCloseForm } = useSelector(selectWarehouse)
    const warehouseColumns = [
        {
            name: 'Адрес',
            fieldName: 'address',
            type: 'string',
            mandatory: true,
            createOnly: false
        },
        {
            name: 'Общий объем',
            fieldName: 'total_capacity',
            type: 'float',
            mandatory: true,
            createOnly: false
        },
        {
            name: 'Занято',
            fieldName: 'occupied',
            type: 'float',
            mandatory: false,
            createOnly: false
        },
        {
            name: 'Создан',
            fieldName: 'createdAt',
            type: 'date',
            mandatory: false,
            createOnly: false
        },
        {
            name: 'Изменен',
            fieldName: 'updatedAt',
            type: 'date',
            mandatory: false,
            createOnly: false
        }
    ]

    const onSubmitClick = (form: any, id: string | null) => {
        if (id)
            dispatch(changeWarehouse({formData: form, id}))
        else 
            dispatch(addWarehouse(form))
    }

    const handleCloseForm = (isCloseForm: boolean) => {
        dispatch(seIsCloseForm(isCloseForm))
    }
    
    const onDeleteItem = (id: string) => {
        dispatch(deleteWarehouse(id))
    }
    
    useEffect(() => {
        dispatch(fetchWarehouses())
    }, [])

    return (
        <section className='tw-pb-4'>
            <NavBar/>
            <ItemsListContainer
                list={warehousesList}
                columns={warehouseColumns}
                isLoading={isLoading}
                isCloseForm={isCloseForm}
                onSubmitClick={onSubmitClick}
                seIsCloseForm={handleCloseForm}
                onDeleteItem={onDeleteItem}
            />
        </section>
    )
}