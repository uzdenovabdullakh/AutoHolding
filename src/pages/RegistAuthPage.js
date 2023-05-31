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
                    setTimeout(() => navigate('/main'), 3000);
                    // navigate('/main')
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
                }
                else {
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
                    {location.state.forLogin?<Auth setEmail={setEmail} setPassword={setPassword} />:
                    <Registration isClient={location.state.isClient} isDealer={location.state.isDealer} 
                    setSecondName={setSecondName} setName={setName} setEmail={setEmail}  setPassword={setPassword} 
                    setRepeatPassword={setRepeatPassword} setAddress={setAddress} setTown={setTown}/>}   
                </form>
                {/* <a>Не зарегистрированы? Зарегиристрироваться</a> */}
            </div>
        </div>     
        
    );
}