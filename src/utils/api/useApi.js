//import React from "react";
import { useSelector } from "react-redux";
import { ABI, CONTRACT_ADDRESS } from './config';
import Web3 from "web3";


export const useApi = ()=>{
    /* <script src="https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js"></script> */
    const ganacheUrl = "HTTP://127.0.0.1:8545"
    const addressContract = CONTRACT_ADDRESS
    let web3js = new Web3(new Web3.providers.HttpProvider(ganacheUrl));
    let contract = new web3js.eth.Contract(ABI, addressContract);
    // const address = useSelector(state=>state.user.ethAddress)


    //баланс
    const printBalance = async (address) => {
        const balance = web3js.eth.getBalance(address).then((result)=>{
            return result
        })
        const b = await balance;
        let weiBalance = web3js.utils.fromWei(b, 'ether')
        return weiBalance;
    };
   
    

    //getServiceStatus(uint _carIndex)
    const printServiceStatus = async (carIndex) => {
        const getServiceStatus = contract.methods.getServiceStatus(carIndex).call().then((result)=>{
            return result
        })
        const res = await getServiceStatus;
        return res;
    };
    

    //getServiceDealers()
    const printServiceDealers = async () => {
        const getServiceDealers = contract.methods.getServiceDealers().call().then((result)=>{
            return result
        })
        const res = await getServiceDealers;
        return res;
    };
    

    //addCar(string memory _brand, string memory _model, uint _year)
    const addCar = async (brand,model,year,address) => {
        await contract.methods.addCar(brand,model,year).send({from: address}).then(console.log)
    }
    // const addCar = contract.methods.addCar().send({from: address}).then(console.log)

    //registerDealer(string memory _name, string memory _city)
    // const register = contract.methods.registerDealer().send({from: address}).then(console.log)
    const register = async (name, city, address) => {
        await contract.methods.registerDealer(name, city).send({from: address}).then(console.log)
    }

    //requestService(address _dealer, uint _carIndex)
    // const requestService = contract.methods.requestService().send({from: address}).then(console.log)
    const requestService = async (dealer, carIndex, address) =>{
        await contract.methods.requestService(dealer, carIndex).send({from: address}).then(console.log)
    }

    //создание аккаунта
    const createAccount = web3js.eth.accounts.create()

    return {
        printBalance,
        printServiceStatus,
        printServiceDealers,
        addCar,
        register,
        requestService,
        createAccount,
    };
}
