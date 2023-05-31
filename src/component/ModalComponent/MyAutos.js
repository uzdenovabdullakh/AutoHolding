import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Cards from '../Cards';
import "../../Styles/MyAutos.css"
import { getDatabase, ref,  onValue } from "firebase/database";
import {useSelector} from 'react-redux'

function MyAutos(props){
    const {setIsClose} = props
    const [cardsArr, setCardsArr] = useState([])
    sessionStorage.setItem('forRequest', true)
    const select = useSelector(state=>state.user)
   
    
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
                            <Cards key={count} carIndex={count} brand={item.brand} model={item.model} year={item.year} ></Cards>
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
        <div className='modal-autos'>
            <div className="modal-body-autos">
                <span onClick={()=>(setIsClose(true))} role="button" className="close_modal">&times;</span>
                <h1>Мои авто</h1>
                <div className="cards_block">
                    <div className="cards">
                        {cardsArr}
                    </div>
                </div>
            </div>
        </div>
    );
}

MyAutos.propTypes = {
    setIsClose: PropTypes.func.isRequired,
}


export default MyAutos;