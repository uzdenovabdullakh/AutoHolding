import React, {useState,  useEffect} from 'react';
import {useSelector} from 'react-redux'
import Avatar from '../component/AvatarHamburger';
import '../Styles/MainPage.css'

export default function MainPage(){
    const select = useSelector(state=>state.user)
    useEffect(()=>{
        
    })
    return (
        <div>
            <Avatar></Avatar>
            <div className="functional">
                <div className="functionalForAdmin hidden_functional">MainPage</div>
            </div>
        </div>
    )
}