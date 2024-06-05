import { $authHost } from "."
import { changeStorekeeperParams } from "../store/slices/storekeeperSlice"

export const getStorekeepersList = async (field: string, order: string) => {
    return await $authHost.get('api/storekeeper', {params: {field, order}})
}

export const createStorekeeper = async (data: object) => {
    return await $authHost.post('api/storekeeper', data)
}

export const editStorekeeper = async (data: changeStorekeeperParams) => {
    return await $authHost.patch('api/storekeeper/' + data.id, data.formData)
}

export const removeStorekeeper = async (id: string) => {
    return await $authHost.delete('api/storekeeper/' + id)
}