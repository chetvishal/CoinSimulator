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

    const [favCoinData, setFavData] = useState([]);

    const favData = async () => {
        try{
            favCoin.map( async coin => {
                const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.coin}`)
                setFavData([...favCoinData, { id: data.id, price: data.market_data.current_price.usd }])
                // change24: coin.price_change_percentage_24h.toFixed(2),
                
            })
        }catch(err){

        }
    }

    // favData();


    const addCoin = (coin) => {
        setFavCoins([...favCoin, { coin: coin, key: Math.random() * (500 - 1) + 1}])
    }

    return (
        <CoinContext.Provider value={{ favCoin, addCoin, favCoinData  }}>
            {props.children}
        </CoinContext.Provider>
    );
}

export default CoinContextProvider;
