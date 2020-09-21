import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CoinContext = createContext();

export const fetchCoins = async () => {
    try {
        const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        return data;
   } catch (err) {
        console.error(err)
   }
}

const CoinContextProvider = (props) => {

    const [favCoin, setFavCoins] = useState([
        {coin: 'bitcoin', key: 1 },
        {coin: 'ripple', key: 2 },
        {coin: 'dogecoin', key: 3 },
        {coin: 'tron', key: 4 },
    ]);

    const addCoin = (coin) => {
        setFavCoins([...favCoin, { coin: coin, key: Math.random() * (500 - 1) + 1}])
    }

    return (
        <CoinContext.Provider value={{ favCoin, addCoin }}>
            {props.children}
        </CoinContext.Provider>
    );
}

export default CoinContextProvider;
