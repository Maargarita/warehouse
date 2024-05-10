import React, {FC, useEffect} from 'react'
import { NavBar } from '../components/NavBar'
import { AppDispatch } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, changeUser, fetchUsers, selectUser, seIsCloseForm, deleteUser } from '../store/slices/userSlice'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'

export const Users: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { usersList, isLoading, isCloseForm } = useSelector(selectUser)
    const userColumns = [
        {
            name: 'Логин',
            fieldName: 'login',
            type: 'string',
            mandatory: true
        },
        {
            name: 'Пароль',
            fieldName: 'password',
            type: 'string',
            mandatory: true
        },
        {
            name: 'Роль',
            fieldName: 'role',
            type: 'string',
            mandatory: true
        },
        {
            name: 'Создан',
            fieldName: 'createdAt',
            type: 'date',
            mandatory: false
        },
        {
            name: 'Изменен',
            fieldName: 'updatedAt',
            type: 'date',
            mandatory: false
        }
    ]

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const onSubmitClick = (form: object, id: string | null) => {
        if (id)
            dispatch(changeUser({formData: form, id}))
        else 
            dispatch(addUser(form))
    }

    const handleCloseForm = (isCloseForm: boolean) => {
        dispatch(seIsCloseForm(isCloseForm))
    }
    
    const onDeleteItem = (id: string) => {
        dispatch(deleteUser(id))
    }

    return (
        <section className='tw-pb-4'>
            <NavBar/>
            <ItemsListContainer
                list={usersList}
                columns={userColumns}
                isLoading={isLoading}
                isCloseForm={isCloseForm}
                onSubmitClick={onSubmitClick}
                seIsCloseForm={handleCloseForm}
                onDeleteItem={onDeleteItem}
            />
        </section>
    )
}