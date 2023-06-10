import React, { Fragment } from 'react'
import { useApi } from '../../utils/api/useApi';
import PropTypes from "prop-types";
import Error from '../Error.js';

function Registration(props){
    const {setSecondName,setName,setEmail,setPassword,setRepeatPassword, setAddress,setTown,isDealer, isClient, error} = props
    const {createAccount} = useApi()

    const handleCheck = async (e) => {
      const el = document.querySelector('.address__input')
      const chbox = document.querySelector('.check')
      if (chbox.checked){
        el.disabled = true;
        el.classList.toggle('address__input__disabled')
        el.readOnly = true;
        
        const a = await createAccount()
        setAddress(a)
      }
      else if(!chbox.checked) {
        el.disabled = false;
        el.classList.toggle('address__input__disabled')
        el.readOnly = false;
        
      }
      //console.log(el)
    }

    return (
        <div>
          <h1>Регистрация</h1>
            <div className="_regist">
                <div className="regist_form">
                  {isClient ? <Fragment>  
                    <input className="inputs name__input" type="text" required placeholder="Введите фамилию" onChange={(e)=>setSecondName(e.target.value)}></input>
                    <input className="inputs" type="text" required placeholder="Введите имя" onChange={(e)=>setName(e.target.value)}></input>
                    </Fragment> : null}
                  {isDealer ? <Fragment>
                    <input className="inputs name__input" type="text" required placeholder="Введите название" minLength={3} onChange={(e)=>setName(e.target.value)}></input>
                    <input className="inputs" type="text" required placeholder="Город" onChange={(e)=>setTown(e.target.value)}></input>
                  </Fragment>: null}
                  <div className="eth__address">
                    <input className="inputs address__input" type="text" required placeholder="Ваш ETH-адрес" onChange={(e)=>setAddress(e.target.value)}></input>
                    <input id="check" type="checkbox" className="check" onClick={handleCheck}/>
					          <label htmlFor="check"><span className="icon"></span>Создать аккаунт в ETH</label>
                  </div>
                  <input className="inputs" type="email" required autoComplete="on" placeholder="Введите e-mail" minLength="6" onChange={(e)=>setEmail(e.target.value)}></input>
                  <input className="inputs" type="password" required placeholder="Придумайте пароль" minLength="6" maxLength="20" onChange={(e)=>setPassword(e.target.value)}></input>
                  <input className="inputs" type="password" required placeholder="Повторите пароль" minLength="6" maxLength="20" onChange={(e)=>setRepeatPassword(e.target.value)}></input> 
                </div>
                {error?<Error error={error}></Error>:null}
                <button className="submit_btn" type="submit">Зарегистрироваться</button>
              </div>
        </div>
    );
}

Registration.propTypes = {
  setSecondName: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setRepeatPassword: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setTown: PropTypes.func.isRequired,
}

export default Registration;