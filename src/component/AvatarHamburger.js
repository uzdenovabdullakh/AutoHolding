import React, { useState, useEffect } from "react";
import ChangePass from "./ModalComponent/ChangePass";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import "../Styles/Avatar.css";
import { useDispatch } from "react-redux";
import {removeUser} from '../utils/store/slices/userSlices'
import { getAuth, updatePassword, deleteUser, reauthenticateWithCredential } from "firebase/auth";

export default function Avatar(props) {
  const {isAccountPage} = props
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isClose, setIsClose] = useState(true)
  const [isClicked,setClicked]=useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')
  const select = useSelector(state=>state.user)

  const handleLogOut = () => { 
    dispatch(removeUser())
  }
  const handleClick = () =>{
    setClicked(true)
    setIsClose(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword===repeatNewPassword){
        try{
            const auth = getAuth();
            const user = auth.currentUser;
            console.log(user)
            const credential = select;

            reauthenticateWithCredential(user, credential).then(() => {
              console.log("reauth,success")
            }).catch((error) => {
              console.log('reauth',error)
            });

            await updatePassword(user, newPassword).then(() => {
              console.log("success")
            }).catch((error) => {
              console.log(error)
            });
            setClicked(false)
        }catch(e){
            console.log(e.message)
            return e
        }
    }
    else {
        throw new Error('Пароли должны совпадать')
    }
    
  }


  const handleDeleteUser = async () => {
    // await api.delete(`http://localhost:5000/api/users/${sessionStorage.getItem('id')}`, )
    const auth = getAuth();
    const user = auth.currentUser;
    await deleteUser(user).then(() => {
      console.log(user,'deleted')
    }).catch((error) => {
      console.log(error)
    });
    dispatch(removeUser())
    navigate('/')
  }



  useEffect(() => {
    if(isClose) {
       setClicked(false)
    }
});

  return (
    <div className="avatar__main">
      <div className="avatar-container">
        <div className="avatar"></div>
        <input className="checkbox" type="checkbox"></input>
        <div className="avatar__menu_items">
            {isAccountPage ? null : <li><Link to="/account">Личный кабинет</Link></li>}
            {isAccountPage ? <li onClick={handleClick}>Сменить пароль</li>: null}
            {isAccountPage ? <li onClick={handleDeleteUser}>Удалить аккаунт</li>: null}
          <li>
            <Link to="/" onClick={handleLogOut}>Выйти</Link>
          </li>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
                {isClicked ? <ChangePass setNewPassword={setNewPassword} setRepeatNewPassword={setRepeatNewPassword} setIsClose={setIsClose} /> : null}
            </form>
    </div>
  );
}
