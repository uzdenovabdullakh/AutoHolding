import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../Styles/GreetingPage.css'

export default function GreetingPage(){
    
    const navigate = useNavigate()

    const handleClick = (e) => {
        if (e.target.classList.contains("login__btn")){
            navigate('/authorization', { state: {forLogin: true }})
        }
        else if (e.target.classList.contains("regist__btn")){
            navigate('/authorization',{state: {forRegist: true}} )
        }
    }

    return (
        <div className='greeting__main'>
            <h1 className="greeting__header">Добро пожаловать!</h1>
            <div className='greeting__btns'>
                <button className='login__btn btn' onClick={handleClick}>Войти</button>
                <button className='regist__btn btn' onClick={handleClick}>Зарегистрироваться</button>
            </div>
        </div>
    );
}