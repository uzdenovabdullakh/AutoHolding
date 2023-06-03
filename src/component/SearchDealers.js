import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import {useSelector} from 'react-redux'

function SearchDealers(props) {
    const {setDealerName,setTown} = props

    return(
        <Fragment>
            {/* getServiceDealer-поиск дилеров, requestService-запрос на ремонтные услуги */}
            <h1>Поиск сервисов</h1>
            <input type="text" className="search__name__service search__inputs" require minLength={3} placeholder="Введите название сервиса" onChange={(e)=>{setDealerName(e.target.value)}}></input>
            <input type="text" className="search__town__service search__inputs" placeholder="Введите город" onChange={(e)=>{setTown(e.target.value)}}></input>
            <button type="submit" className="search__btn">Искать</button>  
        </Fragment>
    );
}

SearchDealers.propTypes = {
    setDealerName: PropTypes.func.isRequired,
    setTown: PropTypes.func.isRequired,
  }


export default SearchDealers;