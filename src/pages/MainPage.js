import React, {useState,  useEffect} from 'react';
import {useSelector} from 'react-redux'
import Avatar from '../component/AvatarHamburger';
import '../Styles/MainPage.css'
import SearchDealers from '../component/SearchDealers';
import DealersList from '../component/DealersList';
import { useApi } from '../utils/api/useApi';

export default function MainPage(){
    const select = useSelector(state=>state.user)
    const [dealerName, setDealerName] = useState('')
    const [town, setTown] = useState('')
    const [dealerAddress, setDealerAddress]=useState('')
    const [isFind, setIsFind] = useState(false)
    const {printDealers}=useApi()

    useEffect(()=>{
        
    })

    const handleSearch = async (e) => {
        e.preventDefault()
        try{
            const data = await printDealers(dealerName)
            const findDealer = data.filter((item)=>{
                return item.city===town
            })
            setDealerAddress(findDealer[0].dealerAddress)  
            setIsFind(true)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className='wrapper'>
            <Avatar></Avatar>
            <div>
                {select.name ? 
                <form onSubmit={handleSearch} className="functional">
                    <SearchDealers setDealerName={setDealerName} setTown={setTown}></SearchDealers>
                </form>
                 : null}
                {isFind ? <DealersList dealerName={dealerName} town={town} dealerAddress={dealerAddress}></DealersList> : null}
            </div>
        </div>
    )
}