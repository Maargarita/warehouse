import { Login } from "../../pages/Login";
import { Products } from "../../pages/Products";
import { Storekeepers } from "../../pages/Storekeepers";
import { Users } from "../../pages/Users";
import { Warehouses } from "../../pages/Warehouses";
import { paths } from "../../utils/consts";

export const authRoutes = [
    {
        path: paths.PRODUCTS_ROUTE,
        Component: Products
    }
]

export const publicRoutes = [
    {
        path: paths.LOGIN_ROUTE,
        Component: Login
    }
]

export const adminRoutes = [
    {
        path: paths.WAREHOUSES_ROUTE,
        Component: Warehouses
    },
    {
        path: paths.USERS_ROUTE,
        Component: Users
    },
    {
        path: paths.STOREKEEPERS_ROUTE,
        Component: Storekeepers
    }
]
