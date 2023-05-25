import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
    ethAddress: null,
    name: null
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
        },
        removeUser(state){
            state.email = null;
            state.id = null;
            state.token = null;
            state.name = null;
            state.ethAddress = null
        }
    },
})

export const {setUser, removeUser} = userSlice.actions; 
export default userSlice.reducer;