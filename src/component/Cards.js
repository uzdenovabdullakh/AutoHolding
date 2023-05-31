import React, { useState, Fragment, useEffect } from "react";
import '../Styles/Cards.css'
import { useApi } from '../utils/api/useApi';
import {useSelector} from 'react-redux'
import { getDatabase, ref, set, push, onValue, update, remove} from "firebase/database";

function Cards(props) {
    const {carIndex, brand, model, year, isCancel, priceFor, clientId, clientAddress} = props
    const {printServiceStatus, printDealerByAddress, requestService, cancelRequest} = useApi()
    const [status, setStatus] = useState('')
    const [dealer, setDealer] = useState('')
    const select = useSelector(state=>state.user)
    const search = useSelector(state=>state.searchData)


    useEffect(()=>{
        const handleStatus = async () =>{
            try{
                const data = await printServiceStatus(carIndex, select.ethAddress)
                const deal = await printDealerByAddress(data.dealer)
                setDealer(deal)
                if (data.inService===false){
                    setStatus('нет')
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
        handleStatus()
    })


    const handleRequest = async () =>{
        //отправка машины в сервис запись данных в базу и в блокчейн
        await requestService(search.dealerAddress, carIndex, select.ethAddress, 20)
        const db = getDatabase();
        const carInServiceListRef = ref(db, 'carsInService'+`/${search.dealerAddress}`);
        const newcarInServiceListRef  = push(carInServiceListRef);
        await set(newcarInServiceListRef, {
            dealerAddress: search.dealerAddress,
            carIndex: carIndex,
            clientAddress:  select.ethAddress,
            clientId: select.id,
            price: 20,
            brand:brand,
            model:model, 
            year:year,
            isCancel: false,
        });
        sessionStorage.removeItem('forRequest')
    }

    const handleCancel = async () =>{
        if (select.name){
            //отправка запроса на отмену в базе значение isCancel меняется на true, то есть отмена
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
                update(ref(db,'/carsInService'+`/${search.dealerAddress}/${j[i]}`), {
                    isCancel: true,
                })
                // let i = JSON.stringify(data)
                // let j = JSON.parse(i)
                // for(var property in j) {
                //     console.log(property + "=" + j[property]);
                // }
                
            }) 
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
            if (b[0].isCancel===true){
                cancelRequest(priceFor,clientAddress,carIndex,select.ethAddress)
                //remove(ref(db,'/carsInService'+`/${search.dealerAddress}/${j[i]}`))
            }
                   
        })
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
                    <div>
                        <p>{clientId}</p>
                        Цена: {priceFor}
                    </div>:null}
                </div>
                    {/* GetServiceStatus */}
                    
                    <div>
                        {sessionStorage.getItem('forRequest') && select.name ?
                        <div>
                            <button onClick={handleRequest}>Отправить в сервис за</button>
                            {search.price}
                        </div>
                        :null}
                        { select.name ?
                        <div>
                            <button onClick={handleCancel}>Отменить</button>
                        </div>
                        :null}
                        {isCancel===true && select.dealerName ?
                        <div>
                            <button onClick={handleConfirmCancel}>Подтвердить отмену</button>
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