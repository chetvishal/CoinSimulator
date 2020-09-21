import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper';
import { CoinContext } from '../contexts/coinContext';

export default function CoinPg({ route, navigation }) {

    // console.log(route)
    const { addCoin } = useContext(CoinContext);
    return (
        <View>
            <Text>{route.params.id}</Text>
            <Button onPress={() => { addCoin(route.params.id) }}>
                Add this coin to favourites
            </Button>
        </View>
    )
}