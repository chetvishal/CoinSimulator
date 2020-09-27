import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CoinContext = createContext();

export const fetchCoins = async () => {
    try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        return data;
    } catch (err) {
        console.error(err)
    }
}

const CoinContextProvider = (props) => {

    const [favCoin, setFavCoins] = useState([
        // {coin: 'bitcoin', qty: 3,key: 1, avg_price: 10000 },
        // {coin: 'ripple', qty: 3,key: 2 },
        // {coin: 'dogecoin', qty: 3,key: 3 },
        // {coin: 'tron', qty: 2,key: 4 },
    ]);

    const [balance, setBalance] = useState(5000);


    const addCoin = (coin, qty, price) => {

        var found = false;

        if (favCoin) {
            favCoin.map(crypto => {
                if (crypto.coin === coin) {
                    crypto.qty = (parseFloat(`${crypto.qty}`) + parseFloat(`${qty}`)).toFixed(2);
                    crypto.avg_price = (parseFloat(`${crypto.avg_price}`) + parseFloat(`${price}`)) / 2;
                    found = true;
                }
            })
            if (!found) {
                setFavCoins([...favCoin, { coin: coin, qty: parseFloat(qty).toFixed(2), avg_price: price, key: Math.random() * (500 - 1) + 1 }])
            }
        }
        else {
            setFavCoins([...favCoin, { coin: coin, qty: parseFloat(qty).toFixed(2), avg_price: price, key: Math.random() * (500 - 1) + 1 }])
        }

    }

    const removeCoin = (coin, qty) => {

        if (favCoin) {
            favCoin.map((crypto, i) => {
                if (crypto.coin === coin) {
                    crypto.qty = (parseFloat(`${crypto.qty}`) - parseFloat(`${qty}`)).toFixed(2);
                    if (parseFloat(crypto.qty) === parseFloat(0)) {
                        favCoin.splice(i, 1);
                    }
                }
            })
        }
    }

    return (
        <CoinContext.Provider value={{ favCoin, addCoin, removeCoin, balance, setBalance }}>
            {props.children}
        </CoinContext.Provider>
    );
}

export default CoinContextProvider;
