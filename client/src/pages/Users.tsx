import React, {FC, useEffect} from 'react'
import { NavBar } from '../components/NavBar'
import { AppDispatch } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, selectUser } from '../store/slices/userSlice'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'

export const Users: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { usersList } = useSelector(selectUser)
    const userColumns = [
        {
            name: 'Логин',
            fieldName: 'login',
            type: 'string'
        },
        {
            name: 'Роль',
            fieldName: 'role',
            type: 'string'
        },
        {
            name: 'Создан',
            fieldName: 'createdAt',
            type: 'date'
        },
        {
            name: 'Изменен',
            fieldName: 'updatedAt',
            type: 'date'
        }
    ]

    useEffect(() => {
        dispatch(fetchUsers({}))
    }, [])

    return (
        <section className='tw-pb-4'>
            <NavBar/>
            <ItemsListContainer
                list={usersList}
                columns={userColumns}
            />
        </section>
    )
}