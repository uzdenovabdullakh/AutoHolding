import React from 'react'
import PropTypes from "prop-types";

function Auth(props){
    const {setEmail,setPassword} = props
    return (
        <React.Fragment>
            <h1>Вход</h1>
            <div className="_login">
                <div className="login_form">
                    <input className="inputs" type="email" required autoComplete="on" placeholder="Введите e-mail" minLength="6" onChange={(e)=>setEmail(e.target.value)}></input>
                    <input className="inputs" type="password" required autoComplete="on" placeholder="Введите пароль" minLength="6" maxLength="20" onChange={(e)=>setPassword(e.target.value)}></input>
                    <button className="submit_btn" type="submit">Войти</button>
                </div>
            </div>
        </React.Fragment>
    );
}

Auth.propTypes = {
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
}

export default Auth;