import React, {FC} from 'react'
import { NavBar } from '../components/NavBar'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'

export const Storekeepers: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    // const { usersList, isLoading, isCloseForm } = useSelector(selectUser)
    const userColumns = [
        {
            name: 'Фамилия',
            fieldName: 'surnamr',
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

    // useEffect(() => {
    //     dispatch(fetchStorekeepers())
    // }, [])

    // const onSubmitClick = (form: object, id: string | null) => {
    //     if (id)
    //         dispatch(changeStorekeeper({formData: form, id}))
    //     else 
    //         dispatch(addStorekeeper(form))
    // }

    // const handleCloseForm = (isCloseForm: boolean) => {
    //     dispatch(seIsCloseForm(isCloseForm))
    // }
    
    // const onDeleteItem = (id: string) => {
    //     dispatch(deleteStorekeeper(id))
    // }

    return (
        <section className='tw-pb-4'>
            <NavBar/>
            {/* <ItemsListContainer
                list={usersList}
                columns={userColumns}
                isLoading={isLoading}
                isCloseForm={isCloseForm}
                onSubmitClick={onSubmitClick}
                seIsCloseForm={handleCloseForm}
                onDeleteItem={onDeleteItem}
            /> */}
        </section>
    )
}