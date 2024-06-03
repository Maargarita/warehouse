import React, {FC, useEffect} from 'react'
import { NavBar } from '../components/NavBar'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { addProduct, changeProduct, deleteProduct, fetchProducts, seIsCloseForm, selectProduct } from '../store/slices/productSlice'
import { fetchWarehouses, selectWarehouse } from '../store/slices/warehouseSlice'

export const Products: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { productsList, isLoading, isCloseForm } = useSelector(selectProduct)
    const { warehousesList } = useSelector(selectWarehouse)
    const productColumns = [
        {
            name: 'Артикль',
            fieldName: 'article_number',
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
            name: 'В наличии',
            fieldName: 'in_stock',
            type: 'int',
            mandatory: false,
            createOnly: false
        },
        {
            name: 'Занимает на складе',
            fieldName: 'warehouse_space',
            type: 'float',
            mandatory: false,
            createOnly: false
        },
        // {
        //     name: 'Склад',
        //     fieldName: 'warehouse_address',
        //     type: 'enum',
        //     mandatory: false,
        //     createOnly: false,
        //     options: warehousesList,
        //     optionsNameField: 'address',
        //     optionsIdField: 'warehouseId'
        // },
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
        // const storekeeper: StorekeeperFormObj = {
        //     name: form.name,
        //     patronymic: form.patronymic,
        //     phone: form.phone,
        //     surname: form.surname,
        //     userId: form['user_login'].id,
        //     warehouseId: form['warehouse_address'].id,
        // }

        if (id)
            dispatch(changeProduct({formData: form, id}))
        else 
            dispatch(addProduct(form))
    }

    const handleCloseForm = (isCloseForm: boolean) => {
        dispatch(seIsCloseForm(isCloseForm))
    }
    
    const onDeleteItem = (id: string) => {
        dispatch(deleteProduct(id))
    }
    
    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchWarehouses())
    }, [])

    return (
        <section className='tw-pb-4'>
            <NavBar/>
            <ItemsListContainer
                list={productsList}
                columns={productColumns}
                isLoading={isLoading}
                isCloseForm={isCloseForm}
                onSubmitClick={onSubmitClick}
                seIsCloseForm={handleCloseForm}
                onDeleteItem={onDeleteItem}
            />
        </section>
    )
}