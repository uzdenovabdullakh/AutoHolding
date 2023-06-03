import React, {useState} from 'react'
import { useLocation,  useNavigate } from "react-router-dom";
import Auth from '../component/ModalComponent/Auth';
import Registration from '../component/ModalComponent/Registration';
import '../Styles/RegisAuth.css'
import {useDispatch} from 'react-redux'
import {setUser} from '../utils/store/slices/userSlices'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useApi } from '../utils/api/useApi';

// /authorization
export default function RegistAuthPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');//коллбэк функции
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [secondName, setSecondName] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [town, setTown] = useState('');
    const {register} = useApi()
    const [error, setError]=useState('')

    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (location.state.forLogin){
            try{
                const auth = getAuth();
                const db = getDatabase();
                signInWithEmailAndPassword(auth, email, password).then(({user})=>{
                    const req = ref(db, 'users/' + user.uid);
                    onValue(req, (snapshot)=>{
                        const data = snapshot.val()
                        dispatch(setUser({
                            email: user.email,
                            id: user.uid,
                            token: user.accessToken,
                            ethAddress: data.ethAddress,
                            name: data.username,
                            dealerName: data.dealerName,
                            town: data.town,
                        }))
                    })
                    setTimeout(() => navigate('/main'), 2000);
                    // navigate('/main')
                }).catch(function(error) {
                    // TODO: Notify user about error
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    console.log(errorCode)
                    if (errorCode==='auth/user-not-found'){
                        setError('Такого пользователя не существует')
                        console.log('Такого пользователя не существует')
                    }
                    if (errorCode==='auth/wrong-password'){
                        setError('Неверный пароль')
                        console.log('Неверный пароль')
                    }
                    })
            }catch(e){
                console.log(e)
            }
        }
        else if (location.state.forRegist){
            try{
                if (password===repeatPassword){
                    const auth = getAuth();
                    const db = getDatabase();
                    createUserWithEmailAndPassword(auth, email, password)
                        .then(({user})=>{
                            if (location.state.isClient){
                                dispatch(setUser({
                                    email: user.email,
                                    id: user.uid,
                                    token: user.accessToken,
                                    ethAddress: address,
                                    name: name + ' ' + secondName,
                                }))
                                set(ref(db, 'users/' +  user.uid), {
                                    username: name + ' ' + secondName,
                                    email: email,
                                    ethAddress: address,
                                });
                            }
                            if(location.state.isDealer){
                                dispatch(setUser({
                                    email: user.email,
                                    id: user.uid,
                                    token: user.accessToken,
                                    ethAddress: address,
                                    dealerName: name,
                                    town: town,
                                }))
                                set(ref(db, 'users/' +  user.uid), {
                                    dealerName: name,
                                    town: town,
                                    email: email,
                                    ethAddress: address,
                                });
                                register(name, town, address)//регистрация в блокчейне эфира
                               
                            }
                           
                            navigate('/main')
                    })
                    .catch(function(error) {
                        // TODO: Notify user about error
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode)
                        console.log(errorMessage)
                        if (errorCode === 'auth/email-already-in-use') {
                            setError('Пользователь с таким email уже существует')
                            console.log('Пользователь с таким email уже существует')
                            //перенаправить на вход
                        }
                        });
                }
                else {
                    setError("Пароли должны совпадать")
                    throw new Error("Пароли должны совпадать")
                }
            }catch(e){

                console.log(e)
            }
        }
    }

    return (
        <div className='modal'>
            <div className='modal-body'>
                <form action="#" onSubmit={handleSubmit}>
                    {location.state.forLogin?<Auth setEmail={setEmail} setPassword={setPassword} error={error} />:
                    <Registration isClient={location.state.isClient} isDealer={location.state.isDealer} 
                    setSecondName={setSecondName} setName={setName} setEmail={setEmail}  setPassword={setPassword} 
                    setRepeatPassword={setRepeatPassword} setAddress={setAddress} setTown={setTown} error={error}/>}   
                </form>
                {/* <a>Не зарегистрированы? Зарегиристрироваться</a> */}
            </div>
        </div>     
        
    );
}