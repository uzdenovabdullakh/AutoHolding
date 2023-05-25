import React from "react";
import PropTypes from "prop-types";
import "../../Styles/ChangePass.css"

function ChangePass(props){
    const {setNewPassword,setRepeatNewPassword,setIsClose} = props
    return (
        <div className='modal-pass'>
            <div className="modal-body-pass">
                <span onClick={()=>(setIsClose(true))} role="button" className="close_modal">&times;</span>
                <h1>Смена пароля</h1>
                <div className="change_block">
                    <input className="inputs inputs_change_pass" type="password" required placeholder="Введите новый пароль" minLength="6" maxLength="20" onChange={(e)=>setNewPassword(e.target.value)}></input>
                    <input className="inputs inputs_change_pass" type="password" required placeholder="Повторите новый пароль" minLength="6" maxLength="20" onChange={(e)=>setRepeatNewPassword(e.target.value)}></input>
                    <button className="submit_btn change_btn" type="submit">Подтвердить</button>
                </div>
            </div>
        </div>
    );
}

ChangePass.propTypes = {
    setNewPassword: PropTypes.func.isRequired,
    setRepeatNewPassword: PropTypes.func.isRequired,
    setIsClose: PropTypes.func.isRequired,
}


export default ChangePass;