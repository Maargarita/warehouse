import React, {FC, useEffect, useState} from 'react'
import { NavBar } from '../components/NavBar'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { addStorekeeper, changeStorekeeper, deleteStorekeeper, fetchStorekeepers, seIsCloseForm, selectStorekeeper } from '../store/slices/storekeeperSlice'
import { fetchUsers, selectUser } from '../store/slices/userSlice'
import { fetchWarehouses, selectWarehouse } from '../store/slices/warehouseSlice'

export interface StorekeeperFormObj {
    surname: string,
    name: string,
    patronymic: string, 
    phone: string, 
    userId: string,
    warehouseId: string
}

export const Storekeepers: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { storekeepersList, isLoading, isCloseForm } = useSelector(selectStorekeeper)
    const { usersList } = useSelector(selectUser)
    const { warehousesList } = useSelector(selectWarehouse)
    const [sortingDirection, setSortingDirection] = useState('ASC')
    const [sortingColumn, setSortingColumn] = useState('surname')
    const storekeeperColumns = [
        {
            name: 'Фамилия',
            fieldName: 'surname',
            type: 'string',
            mandatory: true,
            createOnly: false
        },
        {
            name: 'Имя',
            fieldName: 'name',
            type: 'string',
            mandatory: true,
            createOnly: false
        },
        {
            name: 'Отчество',
            fieldName: 'patronymic',
            type: 'string',
            mandatory: false,
            createOnly: false
        },
        {
            name: 'Телефон',
            fieldName: 'phone',
            type: 'string',
            mandatory: true,
            createOnly: false
        },
        {
            name: 'Пользователь',
            fieldName: 'user_login',
            type: 'enum',
            mandatory: false,
            createOnly: false,
            options: usersList,
            optionsNameField: 'login',
            optionsIdField: 'userId'
        },
        {
            name: 'Склад',
            fieldName: 'warehouse_address',
            type: 'enum',
            mandatory: false,
            createOnly: false,
            options: warehousesList,
            optionsNameField: 'address',
            optionsIdField: 'warehouseId'
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
        const storekeeper: StorekeeperFormObj = {
            name: form.name,
            patronymic: form.patronymic,
            phone: form.phone,
            surname: form.surname,
            userId: form['user_login'].id,
            warehouseId: form['warehouse_address'].id,
        }

        if (id)
            dispatch(changeStorekeeper({formData: storekeeper, id}))
        else 
            dispatch(addStorekeeper(storekeeper))
    }

    const handleCloseForm = (isCloseForm: boolean) => {
        dispatch(seIsCloseForm(isCloseForm))
    }
    
    const onDeleteItem = (id: string) => {
        dispatch(deleteStorekeeper(id))
    }

    const onSortClick = (field: string) => {
        const direction = sortingDirection == 'ASC' ? 'DESC': 'ASC'
        setSortingColumn(field)
        setSortingDirection(direction)
        dispatch(fetchStorekeepers({field: field, order: direction}))
    }
    
    useEffect(() => {
        dispatch(fetchStorekeepers({field: 'surname', order: 'ASC'}))
        dispatch(fetchUsers({field: 'login', order: 'ASC'}))
        dispatch(fetchWarehouses({field: 'address', order: 'ASC'}))
    }, [])

    return (
        <section className='tw-pb-4'>
            <NavBar/>
            <ItemsListContainer
                list={storekeepersList}
                columns={storekeeperColumns}
                isLoading={isLoading}
                isCloseForm={isCloseForm}
                onSubmitClick={onSubmitClick}
                seIsCloseForm={handleCloseForm}
                onDeleteItem={onDeleteItem}
                sortingDirection={sortingDirection}
                sortingColumn={sortingColumn}
                onSortClick={onSortClick}
            />
        </section>
    )
}