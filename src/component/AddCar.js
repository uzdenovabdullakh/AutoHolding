import React, { useState } from "react";
import PropTypes from "prop-types";
import '../Styles/AddCar.css'
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push } from "firebase/database";
import { useApi } from '../utils/api/useApi';

function AddCar(props){
    const {handleClose} = props
    const select = useSelector(state=> state.user)
    const [brand,setBrand] = useState('')
    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const {addCar}=useApi()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const db = getDatabase();
            const carListRef = ref(db, 'cars');
            const newCarRef = push(carListRef);
            set(newCarRef, {
                client: select.id,
                brand: brand,
                model: model,
                year: year,
            }); 
            addCar(brand, model, year, select.ethAddress)
           
            
            // set(ref(db, 'cars/' +  select.id + 'car'), {
            //     brand: brand,
            //     model: model,
            //     year: year,
            // });
             // const updates = {};
            // const a = ref(db, '/users/' + select.id+'/cars/')
            // const b = push(a)

            // update(b, {
                
            // });
            handleClose()
        }catch(e){
            console.log(e.message)
            return e
        }
    }

    return (
        <div className="modal__body__car">
            <h1>Добавление машины</h1>
            <div className="add__car__body">
                <div className="main__block">
                    <div className="brand">
                        <input className="add_car__inputs" required placeholder="Бренд" type="text" onChange={(e)=>setBrand(e.target.value)}></input>
                    </div>
                    <div className="model">
                        <input className="add_car__inputs" required placeholder="Модель" type="text" onChange={(e)=>setModel(e.target.value)}></input>
                    </div>
                    <div className="year">
                        <input className="add_car__inputs" required placeholder="Год" type="text" onChange={(e)=>setYear(e.target.value)}></input>
                     </div>
                    <div className="add__car__buttons">
                        <button className="adding_button" type="submit" onClick={handleSubmit}>Добавить</button>
                        <button className="cancel_button" onClick={handleClose}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

AddCar.propTypes = {
    handleClose: PropTypes.func.isRequired,
}

export default AddCar;