import React from "react";
import '../Styles/ChoosingRole.css'
import { useNavigate } from "react-router-dom";

const container = {
    height: '100vh',
    background: '#58A9A5',
    color:'#fff',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    fontFamily: 'Montserrat',
}
const text = {
    fontWeight: 700,
    fontSize: '2rem',
    marginTop: '150px',
    lineHeight: 1,
}

const buttonBlock = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
}

export default function ChooseRole(){
    const [isDealer,setClickedDealer]=React.useState(false)
    const [isClient,setClickedClient]=React.useState(false)
    const navigate = useNavigate()

    const handleDealer = (e) =>{
        if (isDealer){
            setClickedDealer(false)
        }
        else {
            setClickedDealer(true)
            setClickedClient(false)
        }
    }
    const handleClient = () =>{
        if (isClient){
            setClickedClient(false)
        }
        else {
            setClickedClient(true)
            setClickedDealer(false)
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isDealer){
            navigate('/authorization',{state: {forRegist: true, isDealer: true}})
        }
        else if (isClient){
            navigate('/authorization',{state: {forRegist: true, isClient: true}} )
        }
    }

    let btn_class_dealer = isDealer ? "SelectButton" : "nonSelectButton";
    let btn_class_client = isClient ? "SelectButton" : "nonSelectButton";
    return (
        <div style={container}>
            <div style={text}>
                <h2>Вы?</h2>
                <div style={buttonBlock}>
                    <button onClick={handleDealer} className={btn_class_dealer}>Дилерский сервис</button>
                    <button onClick={handleClient} className={btn_class_client}>Клиент</button>
                </div>
            </div>
            <form action="#" onSubmit={handleSubmit}>
                <button className="submit_btn submit_btn_choosing" type="submit">Продолжить</button>
            </form>
        </div>
    );
}