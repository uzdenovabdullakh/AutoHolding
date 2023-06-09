import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import { useApi } from '../utils/api/useApi';
import Avatar from '../component/AvatarHamburger';
import '../Styles/Account.css'
import Arrow from '../component/Arrow';
import ClientAccount from '../component/ClientAccount';
import DealerAccount from '../component/DealerAccount';

export default function AccountPage(){
    const select = useSelector(state=>state.user)
    const [balance, setBalance] = useState(0)
    const {printBalance}=useApi()
   
    sessionStorage.setItem('isDone', true)
    useEffect(()=>{
        const bal = async ()=>{
            const bal = await printBalance(select.ethAddress)
            setBalance(bal)
        }
        bal()
    })

    const handleCopy = () => {
        let copyText = document.getElementById('address')
        let text = copyText.textContent;
        navigator.clipboard.writeText(text);
        let tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Скопировано: " + text;
    }

    const outFunc = ()=>{
        let tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Скопировать в буфер обмена";
    }

    


    return (
        <div className='account__wrapper'>
            <Link to="/main" className="back__to__main"><Arrow></Arrow></Link>
            <Avatar isAccountPage={true}></Avatar>
            <div className="about__user">
                <div className="name">{select.name ? select.name : select.dealerName}</div>
                <div className="town">{select.town ? select.town : null}</div>
                <div className="email">{select.email}</div>
                <div className="my__address">ETH-адрес: 
                    <span id="address">{select.ethAddress}</span>
                    <div className="tooltip">
                        <button className="copy__btn" onClick={handleCopy} onMouseOut={outFunc}>
                            <span className="tooltiptext" id="myTooltip">Скопировать в буфер обмена</span>Скопировать
                        </button>
                    </div>
                </div>
                <div className="my__balance">Баланс:<br /><span>{balance}</span></div>
            </div>
            {select.name ? <ClientAccount></ClientAccount> : null}
            {select.dealerName ? <DealerAccount></DealerAccount> : null}
        </div>
    )
}