import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import AddCar from '../component/AddCar';
import Cards from '../component/Cards';
import { getDatabase, ref,  onValue } from "firebase/database";
import { setCards } from '../utils/store/slices/userSlices';
import {useSelector} from 'react-redux'

function ClientAccount(props){
    const [isClickAdd, setIsClickedAdd] = useState(false)
    const [cardsArr, setCardsArr] = useState([])
    const dispatch = useDispatch();
    const select = useSelector(state=>state.user)
    const handleClose = ()=>{
        setIsClickedAdd(false)
    }

    useEffect(()=>{
        const handleCards = async () =>{
            if (sessionStorage.getItem('isDone')){
                try {
                    const db = getDatabase();
                    const req = ref(db, 'cars/');
                    await onValue(req, (snapshot)=>{
                        let data = snapshot.val()
                        if (data===null || undefined){
                            data=0
                        }
                        let b = Object.values(data).filter(foo)
                        function foo(item){
                            if (item.client===select.id){
                                return item
                            }
                        }
                        
                        let count=-1;
                        const cards = b.map((item)=>{
                            count=count+1;
                            return (
                                <Cards key={count} carIndex={count} brand={item.brand} model={item.model} year={item.year}></Cards>
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
    
    return (
        <div> 
            <button className='add__car__btn' onClick={()=>setIsClickedAdd(true)}>Добавить машину</button>
            {isClickAdd ? <AddCar handleClose={handleClose}></AddCar> : null} 
            <div className="ads__block">
                <div className="cards">
                     {cardsArr}
                </div>  
            </div>
        </div>

    );

}


export default ClientAccount;


