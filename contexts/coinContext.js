import React, { createContext, useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { coinReducer } from '../reducers/coinReducer';
import { balanceReducer } from '../reducers/balanceReducer'

export const CoinContext = createContext();

export const fetchCoins = async () => {

    try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .catch(error => {
            alert("Sorry, something went wrong");
        })
        // console.log('inside fetchCoins')
        return data;

    } catch (err) {
        console.error(err)
    }
}

export const fetchCoinChart = async (id) => {
    try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=2`)
        .catch(error => {
            alert("Sorry, something went wrong");
        })
        // console.log('inside fetchCoins')
        return data;

    } catch (err) {
        console.error(err)
    }
}


const CoinContextProvider = (props) => {

    // {coin: 'bitcoin', qty: 3,key: 1, avg_price: 10000 },
    // {coin: 'ripple', qty: 3,key: 2, avg_price: 10000 },
    // {coin: 'dogecoin', qty: 3,key: 3, avg_price: 10000 },
    // {coin: 'tron', qty: 2,key: 4 , avg_price: 10000, purchase_history: [
    //      {date: '', qty: '', price: ''}
    //]},

    const [arr, setArr] = useState([]);

    const getLocal = async () => {
        // try {
        //     const value = AsyncStorage.getItem('FAVCOINS1')
        //     if (value !== null || value !== undefined) {
        //         // We have data!!
        //         console.log('value not null',JSON.parse(value));
        //         return [
        //             { coin: 'ripple', qty: 3, key: 2, avg_price: 10000 },
        //             { coin: 'dogecoin', qty: 3, key: 3, avg_price: 10000 },
        //             { coin: 'tron', qty: 2, key: 4, avg_price: 10000 }
        //         ]
        //     } else {
        //         console.log('array is empty')
        //         return [
        //             { coin: 'ripple', qty: 3, key: 2, avg_price: 10000 },
        //             { coin: 'dogecoin', qty: 3, key: 3, avg_price: 10000 },
        //             { coin: 'tron', qty: 2, key: 4, avg_price: 10000 }
        //         ]
        //     }
        // } catch (error) {
        //     console.log('error handleChekc: ', error)
        //     return [
        //         { coin: 'ripple', qty: 3, key: 2, avg_price: 10000 },
        //         { coin: 'dogecoin', qty: 3, key: 3, avg_price: 10000 },
        //         { coin: 'tron', qty: 2, key: 4, avg_price: 10000 }
        //     ]
        // }
        try {
            const value = await AsyncStorage.getItem('FAVCOINS1')
            if (value !== null) {
                // We have data!!
                setArr(JSON.parse(value));
                setFavCoins(JSON.parse(value));
                console.log('from getLocal',JSON.parse(value));
            } else {
                console.log('array is empty')
            }
        } catch (error) {
            console.log('error handleChekc: ', error)
        }
    }

    const getLocalBalance = async () => {
        try {
            const value = await AsyncStorage.getItem('BALANCE1')
            if (value !== null) {
                // We have data!!
                // setArr(JSON.parse(value));
                // setFavCoins(JSON.parse(value));
                setBalance(parseFloat(value))
                console.log('from getLocalBalance',parseFloat(value));
            } else {
                console.log('BALANCE1 IS EMPTY')
            }
        } catch (error) {
            console.log('error BALANCE1 ERR: ', error)
        }
    }


    // const [favCoin, dispatchCoins] = useReducer(coinReducer, []
    //     , () => {
    //         // const localData = AsyncStorage.getItem('FAVCOINS1');
    //         // console.log('from favCoin ', JSON.stringify(localData))
    //         // return localData ? JSON.parse(localData) : [];
    //         return arr;
    //     }
    // );

    const [favCoin, setFavCoins] = useState([]); 

    const [balance, setBalance] = useState(50000);

    useEffect(() => {
        getLocal();
        getLocalBalance();
    }, []);

    function setLocalCoin() {
        AsyncStorage.setItem('FAVCOINS1', JSON.stringify(favCoin))
    }

    function setLocalBalance() {
        AsyncStorage.setItem('BALANCE1', JSON.stringify(balance))
    }

    useEffect(() => {
        setLocalCoin();
    }, [favCoin]);

    useEffect(() => {
        setLocalBalance();
    }, [balance]);

    const addCoin = (coin, qty, price) => {

        var found = false;

        if (favCoin) {
            favCoin.map(crypto => {
                if (crypto.coin === coin) {
                    crypto.qty = (parseFloat(`${crypto.qty}`) + parseFloat(`${qty}`)).toFixed(2);
                    crypto.avg_price = (parseFloat(`${crypto.avg_price}`) + parseFloat(`${price}`)) / 2;
                    found = true;
                    // dispatchCoins({ type: 'ADD_EXISTING_COIN' });
                    // //setcoin not working here
                    setLocalCoin();
                }
            })
            if (!found) {
                setFavCoins([...favCoin, { coin: coin, qty: parseFloat(qty).toFixed(2), avg_price: price, key: Math.random() * (500 - 1) + 1 }])
                // dispatchCoins({
                //     type: 'ADD_COIN', coin: {
                //         coin: coin, qty: parseFloat(qty).toFixed(2), avg_price: price, key: Math.random() * (500 - 1) + 1
                //     }
                // })
                // setLocalCoin();
            }
        }
        else {
            setFavCoins([...favCoin, { coin: coin, qty: parseFloat(qty).toFixed(2), avg_price: price, key: Math.random() * (500 - 1) + 1 }])
            // dispatchCoins({
            //     type: 'ADD_COIN', coin: {
            //         coin: coin, qty: parseFloat(qty).toFixed(2), avg_price: price, key: Math.random() * (500 - 1) + 1
            //     }
            // })
            // setLocalCoin();
        }

    }

    const removeCoin = (coin, qty) => {

        if (favCoin) {
            favCoin.map((crypto, i) => {
                if (crypto.coin === coin) {
                    crypto.qty = (parseFloat(`${crypto.qty}`) - parseFloat(`${qty}`)).toFixed(2);
                    //not working here
                    setLocalCoin();
                    if (parseFloat(crypto.qty) === parseFloat(0)) {
                        favCoin.splice(i, 1);
                        // favCoin.filter(parseFloat(crypto.qty) !== parseFloat(0))
                        // dispatchCoins({ type: 'REMOVE_COIN', key: crypto.key })
                        // setLocalCoin();
                    }
                }
            })
        }
    }

    return (
        // , getLocalBalance, getLocalCoins
        <CoinContext.Provider value={{ favCoin, addCoin, removeCoin, balance, setBalance, getLocal, arr }}>
            {props.children}
        </CoinContext.Provider>
    );
}

export default CoinContextProvider;
