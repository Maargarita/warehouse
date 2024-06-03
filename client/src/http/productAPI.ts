import { $authHost } from "."
import { changeProductParams } from "../store/slices/productSlice"

export const getProductsList = async () => {
    return await $authHost.get('api/product')
}

export const createProduct = async (data: object) => {
    return await $authHost.post('api/product', data)
}

export const editProduct = async (data: changeProductParams) => {
    return await $authHost.patch('api/product/' + data.id, data.formData)
}

export const removeProduct = async (id: string) => {
    return await $authHost.delete('api/product/' + id)
}