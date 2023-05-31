import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    dealerAddress: null,
    dealerName: null,
    town: null,
    price: 20,
    carIndex: null,
};

const searchReducer = createSlice({
    name: 'searchData',
    initialState,
    reducers: {
        setData(state, action){
            state.dealerAddress = action.payload.dealerAddress;
            state.dealerName = action.payload.dealerName;
            state.town = action.payload.town;
        },
        removeData(state){
            state.dealerAddress = null;
            state.dealerName = null;
            state.town = null;
        },
        setIndex(state, action){
            state.carIndex = action.payload.carIndex;
        },
        removeIndex(state){
            state.carIndex = null;
        }
    },
})

export const {setData, removeData, setIndex, removeIndex} = searchReducer.actions; 
export default searchReducer.reducer;