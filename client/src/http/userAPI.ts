import { $authHost, $host } from "."

export const login = async (login: string, password: string) => {
    const {data} = await $host.post('api/user/login', {login, password})
    return data.token
}