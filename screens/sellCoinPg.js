import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CoinContext } from '../contexts/coinContext';

export default function SellCoinPg({ route, navigation }) {

    const [qty, setQty] = useState('');
    const { removeCoin, balance, setBalance } = useContext(CoinContext);

    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.id}</Text>
            <TextInput
                label="Quantity"
                mode='flat'
                placeholder="Enter quantity you want to purchase"
                value={qty}
                onChangeText={(qty) => setQty(qty)}
                keyboardType='numeric'
            />
            <Button onPress={ () => { 
                removeCoin(route.params.id, qty)
                setBalance(balance  + ( parseFloat(qty) * route.params.current_price ))
                } }>
                Sell
            </Button>
        </View>
    )
}