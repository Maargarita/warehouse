import { $authHost } from "."
import { changeWarehouseParams } from "../store/slices/warehouseSlice"

export const getWarehousesList = async () => {
    return await $authHost.get('api/warehouse')
}

export const createWarehouse = async (data: object) => {
    return await $authHost.post('api/warehouse', data)
}

export const editWarehouse = async (data: changeWarehouseParams) => {
    return await $authHost.patch('api/warehouse/' + data.id, data.formData)
}

export const removeWarehouse = async (id: string) => {
    return await $authHost.delete('api/warehouse/' + id)
}