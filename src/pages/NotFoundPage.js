import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NotFoundPage.css"
import { useAuth } from "../utils/hooks/useAuth";

export default function NotFoundPage(){
    const {isAuth} = useAuth()
    return(
        <div className="page_box">
            <div className="box">
                <h2>404</h2>
                <p>Страница не найдена</p>
                <p className="back">
                   {isAuth?<Link to="/main">Вернуться на главную</Link>:<Link to="/">Войти или зарегистрироваться</Link>} 
                </p>
            </div>
        </div>
    );
}