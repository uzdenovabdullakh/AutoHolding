import React from "react";
import {Navigate, Outlet} from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
const PrivateRoute = () => {
    const {isAuth} = useAuth();//если ложь то перенаправляет на страницу регистрации
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;