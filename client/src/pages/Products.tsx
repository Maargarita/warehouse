import React, {FC, useEffect, useState} from 'react'
import { NavBar } from '../components/NavBar'
import { ItemsListContainer } from '../components/itemsList/ItemsListContainer'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { addProduct, changeProduct, deleteProduct, fetchProducts, seIsCloseForm, selectProduct } from '../store/slices/productSlice'
import { fetchWarehouses, selectWarehouse } from '../store/slices/warehouseSlice'

type ProductFormObj = {
    article_number: string,
    name: string,
    in_stock: number,
    warehouse_space: number,
    warehouseId: string
}

export const Products: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { productsList, isLoading, isCloseForm } = useSelector(selectProduct)
    const { warehousesList } = useSelector(selectWarehouse)
    const [sortingDirection, setSortingDirection] = useState('ASC')
    const [sortingColumn, setSortingColumn] = useState('article_number')
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
        const product: ProductFormObj = {
            article_number: form.article_number,
            name: form.name,
            in_stock: form.in_stock,
            warehouse_space: form.warehouse_space,
            warehouseId: form['warehouse_address'].id,
        }

        if (id)
            dispatch(changeProduct({formData: product, id}))
        else 
            dispatch(addProduct(product))
    }

    const handleCloseForm = (isCloseForm: boolean) => {
        dispatch(seIsCloseForm(isCloseForm))
    }
    
    const onDeleteItem = (id: string) => {
        dispatch(deleteProduct(id))
    }

    const onSortClick = (field: string) => {
        const direction = sortingDirection == 'ASC' ? 'DESC': 'ASC'
        setSortingColumn(field)
        setSortingDirection(direction)
        dispatch(fetchProducts({field: field, order: direction}))
    }
    
    useEffect(() => {
        dispatch(fetchProducts({field: 'article_number', order: 'ASC'}))
        dispatch(fetchWarehouses({field: 'address', order: 'ASC'}))
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
                sortingDirection={sortingDirection}
                sortingColumn={sortingColumn}
                onSortClick={onSortClick}
            />
        </section>
    )
}