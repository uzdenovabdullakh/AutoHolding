import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import Error from '../Error.js';
const para = {
    textAlign: 'right',
}
const link = {
    textDecoration: 'none',
}
function Auth(props){
    const {setEmail,setPassword, error} = props
    return (
        <React.Fragment>
            <h1 className="login__header">Вход</h1>
            <div className="_login">
                <div className="login_form">
                    <input className="inputs" type="email" required autoComplete="on" placeholder="Введите e-mail" minLength="6" onChange={(e)=>setEmail(e.target.value)}></input>
                    <input className="inputs" type="password" required autoComplete="on" placeholder="Введите пароль" minLength="6" maxLength="20" onChange={(e)=>setPassword(e.target.value)}></input>
                    {error?<Error error={error}></Error>:null}
                    <button className="submit_btn" type="submit">Войти</button>
                </div>
                <p style={para}>Не зарегистрированы? <Link style={link} to="/choose" >Зарегистрироваться</Link></p>
            </div>
        </React.Fragment>
    );
}

Auth.propTypes = {
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
}

export default Auth;