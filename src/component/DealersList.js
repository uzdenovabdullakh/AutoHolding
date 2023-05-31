import React, { useState, Fragment, useEffect } from "react";
import '../Styles/Cards.css'
import MyAutos from "./ModalComponent/MyAutos";
import {useDispatch} from 'react-redux'
import {setData} from '../utils/store/slices/searchSlices'


const styles = {
    borderRadius: '4px',
    outline: 'none',
    border: 'none',
    padding: '5px',
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    color: '#FFFFFF',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#08E839',
}

const height = {
    minHeight: '115px',
}

const name = {
    display: 'inline',
    textAlign: 'center',
}
function DealersList(props) {
    const {dealerName, town, dealerAddress} = props
    const [isClose, setIsClose] = useState(true)
    const [isClicked,setClicked]=useState(false)
    const dispatch = useDispatch()

    const handleRequest = () =>{
        sessionStorage.setItem('isDone', false)
        dispatch(setData({
            dealerAddress,
            dealerName,
            town,
        }))
        setClicked(true)
        setIsClose(false)
    }

    useEffect(() => {
        if(isClose) {
           setClicked(false)
        }
    });

    return(
        <Fragment>
            {/* getServiceDealer-поиск дилеров, requestService-запрос на ремонтные услуги */}
            <div className="ads__block">
                <div className="cards">
                    <div className="card" style={height}>
                        <div className="card__bottom">
                            <div className="card__prices" style={name}>
                                <div className="card__price">{dealerName}</div>
                            </div>
                            <div className="card__title">Город: {town}</div>
                            {/* <div className="card__category"><p>{dealerAddress}</p></div> */}
                            <button style={styles} onClick={handleRequest}>Отдать авто в сервис</button>
                        </div>
                       
                            {isClicked?<MyAutos setIsClose={setIsClose}></MyAutos>:null}
                    </div>
                </div>
            </div>
            
           
        </Fragment>
    );
}



export default DealersList;