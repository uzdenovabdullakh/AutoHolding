import React, {useEffect, useState} from 'react';
import Cards from '../component/Cards';
import { getDatabase, ref,  onValue } from "firebase/database";
import {useSelector} from 'react-redux'

function DealerAccount(props){
    const [cardsArr, setCardsArr] = useState([])
    const select = useSelector(state=>state.user)
    useEffect(()=>{
        const handleCards = async () =>{
            if (sessionStorage.getItem('isDone')){
                try {
                    const db = getDatabase();
                    const car = ref(db, 'carsInService/'+`${select.ethAddress}`);
                    await onValue(car, (snapshot)=>{
                        let data = snapshot.val()
                        if (data===null || undefined){
                            data=0
                        }
                        
                        let b = Object.values(data).filter(foo)
                        function foo(item){
                            if (item.dealerAddress===select.ethAddress){
                                return item
                            }
                        }
                        
                        let count=-1;
                        const cards = b.map((item)=>{
                            count=count+1;
                            return (
                                <Cards key={count} carIndex={item.carIndex} brand={item.brand} model={item.model} year={item.year} isCancel={item.isCancel} priceFor={item.price} clientId={item.clientId} clientAddress={item.clientAddress}></Cards>
                            );
                        })
                        setCardsArr([...cards])
                        sessionStorage.removeItem('isDone')
                    })     
                }catch(e){
                    console.log(e)
                    sessionStorage.removeItem('isDone')
                }
            }
            
        }
        handleCards()
    })

    const header = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '700',
        marginLeft: '50px',
    }
    return (
        <div className="dealer__wrapper"> 
            <h1 style={header}>Машины в сервисе:</h1>
            <div className="ads__block">
                <div className="cards">
                     {cardsArr}
                </div>  
            </div>
        </div>

    );

}


export default DealerAccount;


