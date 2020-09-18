import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CoinContext } from '../contexts/coinContext';

export default function Portfolio() {
    const {coins} = useContext(CoinContext);
    return(
        <View>
            <Text style={styles.text}>Portfolio</Text>
            <Button onPress={() => console.log(coins)} title="press me"/>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 45,
        fontWeight: 'bold'
    }
})