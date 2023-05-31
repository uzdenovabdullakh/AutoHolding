import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
    ethAddress: null,
    name: null,
    dealerName: null,
    town: null,
    cards: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.ethAddress = action.payload.ethAddress;
            state.name = action.payload.name;
            state.dealerName = action.payload.dealerName;
            state.town = action.payload.town;
        },
        removeUser(state){
            state.email = null;
            state.id = null;
            state.token = null;
            state.name = null;
            state.ethAddress = null;
            state.dealerName = null;
            state.town = null;
            state.cards = null;
        },
        setCards(state, action){
            state.cards = action.payload.cards;
        }
    },
})

export const {setUser, removeUser, setCards} = userSlice.actions; 
export default userSlice.reducer;