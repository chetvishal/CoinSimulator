import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CoinContext = createContext();

export const fetchCoins = async () => {
    try {
        const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        return data;
   } catch (err) {

   }
}

const CoinContextProvider = (props) => {

    const [coins, setCoins] = useState([]);

    return (
        <CoinContext.Provider value={{ coins }}>
            {props.children}
        </CoinContext.Provider>
    );
}

export default CoinContextProvider;
