import { $authHost, $host } from "."
import { changeUserParams } from "../store/slices/userSlice"

export const login = async (login: string, password: string) => {
    const {data} = await $host.post('api/user/login', {login, password})
    return data.token
}

export const getUsersList = async (field: string, order: string) => {
    return await $authHost.get('api/user', {params: {field, order}})
}

export const createUser = async (data: object) => {
    return await $authHost.post('api/user', data)
}

export const editUser = async (data: changeUserParams) => {
    return await $authHost.patch('api/user/' + data.id, data.formData)
}

export const removeUser = async (id: string) => {
    return await $authHost.delete('api/user/' + id)
}