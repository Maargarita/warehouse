import { $authHost, $host } from "."
import { jwtDecode} from 'jwt-decode'

interface JwtPayload {
    id: string,
    login: string,
    role: string
}

export const login = async (login: string, password: string) => {
    const {data} = await $host.post('api/user/login', {login, password})
    return jwtDecode(data.token) as JwtPayload
}