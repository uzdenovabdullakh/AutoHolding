import React, { useState, Fragment, useEffect } from "react";
import '../Styles/Cards.css'
import { useApi } from '../utils/api/useApi';
import {useSelector} from 'react-redux'
import { getDatabase, ref, set, push, onValue, update, remove} from "firebase/database";

function Cards(props) {
    const {carIndex, brand, model, year, isCancel, priceFor, clientId, clientAddress, forClientAcc, forMyAutos} = props
    
    const {printServiceStatus, printDealerByAddress, requestService, cancelRequest} = useApi()
    const [status, setStatus] = useState('')
    const [dealer, setDealer] = useState('')
    const [clientEmail, setClientName]=useState('')
    const select = useSelector(state=>state.user)
    const search = useSelector(state=>state.searchData)


    useEffect(()=>{
        const handleStatus = async () =>{
            try{
                const data = await printServiceStatus(carIndex, select.ethAddress)
                const deal = await printDealerByAddress(data.dealer)
                setDealer(deal)
                if (data.inService===false){
                    setStatus('В сервисе: нет')
                }
                else {
                    setStatus("В сервисе у")
                    //sessionStorage.removeItem('forRequest')
                    //sessionStorage()
                }
            }
            catch(e){
                console.log(e)
            }
        }
        const handleClientData = async ()=>{
            if (select.dealerName){
                try{
                    const db = getDatabase();
                    const client = ref(db, 'users'+`/${clientId}`);
                    await onValue(client, (snapshot)=>{
                        let data = snapshot.val()
                        setClientName(data.email)
                    })
                }catch(e){
                    console.log(e)
                }
            }
        }
        handleClientData()
        if (select.name){
            handleStatus()
        }
    })


    const handleRequest = async () =>{
        //отправка машины в сервис запись данных в базу и в блокчейн
        try {
            const p = 0.035
            await requestService(search.dealerAddress, carIndex, select.ethAddress, p)
            const db = getDatabase();
            const carInServiceListRef = ref(db, 'carsInService'+`/${search.dealerAddress}`);
            const newcarInServiceListRef  = push(carInServiceListRef);
            await set(newcarInServiceListRef, {
                dealerAddress: search.dealerAddress,
                carIndex: carIndex,
                clientAddress:  select.ethAddress,
                clientId: select.id,
                price: p,
                brand:brand,
                model:model, 
                year:year,
                isCancel: false,
            });
            sessionStorage.removeItem('forRequest')
        }
        catch(e){
            console.log(e)
        }
        
    }

    const handleCancel = async () =>{
        if (select.name){
            //отправка запроса на отмену в базе значение isCancel меняется на true, то есть отмена
            try {
                const db = getDatabase();
                const car = ref(db, 'carsInService'+`/${search.dealerAddress}`);
                await onValue(car, (snapshot)=>{
                    let data = snapshot.val()
                    if (data===null || undefined){
                        data=0
                    }
                    let i;
                    let b = Object.values(data).filter((item, index)=>{
                        if (item.carIndex===carIndex && item.clientId===select.id){
                            i=index
                            return item
                        }   
                    })
                    let j = Object.keys(data)
                    console.log('запускается update')
                    if (j[i]!==undefined){
                        update(ref(db,'/carsInService'+`/${search.dealerAddress}/${j[i]}`), {
                            isCancel: true,
                        })
                    }
                // let i = JSON.stringify(data)
                // let j = JSON.parse(i)
                // for(var property in j) {
                //     console.log(property + "=" + j[property]);
                // }
                }) 
            } catch(e){
                console.log(e)
                window.location.reload();
            }
            
            // const reqListRef = ref(db, 'requests');
            // const newReqRef = push(reqListRef);
            // await set(newReqRef, {
            //     dealerAddress: search.dealerAddress,
            //     carIndex: index,
            //     clientAddress:  select.ethAddress,
            //     clientId: select.id,
            //     price: 20,
            // }); 
        }  
    }
    
    const handleConfirmCancel = async () => {
        //подтверждение отмены со стороны дилера и возврат средств
        if (select.dealerName){
            try{
                const db = getDatabase();
                const req = ref(db, 'carsInService/'+`${select.ethAddress}`);
                await onValue(req, (snapshot)=>{
                    let data = snapshot.val()
                    if (data===null || undefined){
                        data=0
                    }
                    let i;
                    let b = Object.values(data).filter((item, index)=>{
                        if (item.carIndex===carIndex && item.clientId===clientId){
                            i=index
                            return item
                        }
                    })
                    let j = Object.keys(data)
                    if (b[0]!==undefined && b[0].isCancel===true){
                        console.log(b[0]===undefined)
                        cancelRequest(0.035,clientAddress,carIndex,select.ethAddress).then(console.log())
                        remove(ref(db,'/carsInService'+`/${select.ethAddress}/${j[i]}`))
                        //window.location.reload();
                    }
                       
                })
            } 
            catch(e){
                console.log(e)
                window.location.reload();
            }
        }
        
    }

    return(
        <Fragment>
            <div className="card">
                <div className="card__bottom">
                    <div className="card__prices">
                        <div className="card__price">Название: {brand}</div>
                    </div>
                    <div className="card__title">Модель: {model}</div>
                    <div className="card__category">Год выпуска: {year}</div>
                    {status} {dealer} 
                    {select.dealerName? 
                    <div className="client__data">
                        <p>{clientEmail}</p>
                        Цена: {priceFor} ETH
                    </div>:null}
                </div>
                    {/* GetServiceStatus */}
                    
                    <div className="card__btns">
                        {forMyAutos ?
                        <div className="request__block">
                            <button className="card__requests" onClick={handleRequest}>Отправить в сервис</button>
                            <span>Стоимость: 0.035 ETH</span>
                        </div>
                        :null}
                        {forClientAcc && dealer ?
                        <div className="cancel__block">
                            <button className="card__requests" onClick={handleCancel}>Вернуть</button>
                        </div>
                        :null}
                        {isCancel===true && select.dealerName ?
                        <div className="cancel__block">
                            <button className="card__requests" onClick={handleConfirmCancel}>Подтвердить возврат</button>
                        </div>
                        :null}
                    </div>
            </div>
        </Fragment>
    );
}

Cards.propTypes = {
   
}

export default Cards;