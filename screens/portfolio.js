import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CoinContext } from '../contexts/coinContext';

export default function Portfolio() {
    const { favCoin } = useContext(CoinContext);
    const [coin, setCoins] = useState([]);
    return favCoin.length ? (
        <View style={{ marginTop: 20 }}>
            {
                favCoin.map(coin => {
                    return (
                        <Text style={{ marginTop: 20 }} key={coin.key}>{coin.coin}</Text>
                    )
                })
            }
        </View>
    ) : (
            <View><Text>No coins to show</Text></View>
        );
}

{/* <Button onPress={() => console.log(favCoin)} title="he me"/> */ }

const styles = StyleSheet.create({
    text: {
        marginTop: 45,
        fontWeight: 'bold'
    }
})