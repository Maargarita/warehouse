import React, {FC, useEffect} from 'react'
import { NavBar } from '../components/NavBar'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { addStorekeeper, changeStorekeeper, deleteStorekeeper, fetchStorekeepers, seIsCloseForm, selectStorekeeper } from '../store/slices/storekeeperSlice'
import { fetchUsers, selectUser } from '../store/slices/userSlice'

export interface StorekeeperFormObj {
    surname: string,
    name: string,
    patronymic: string, 
    phone: string, 
    userId: string,
    warehoueseId?: string
}

export const Storekeepers: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { storekeepersList, isLoading, isCloseForm } = useSelector(selectStorekeeper)
    const { usersList } = useSelector(selectUser)
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
            type: 'string',
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
        const storekeeper: StorekeeperFormObj = {
            name: form.name,
            patronymic: form.patronymic,
            phone: form.phone,
            surname: form.surname,
            userId: form['user_login'].id,
            // warehoueseId
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
    
    useEffect(() => {
        dispatch(fetchStorekeepers())
        dispatch(fetchUsers())
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
            />
        </section>
    )
}