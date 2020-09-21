import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, Title, Paragraph, DataTable } from 'react-native-paper';
import { CoinContext, fetchCoins } from '../contexts/coinContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function Market({ navigation }) {

    const { addCoin } = useContext(CoinContext);
    const [cryptos, setCoins] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCoins(await fetchCoins());
        };

        fetchAPI();
    }, []);

    return (
        <ScrollView>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> CryptoCurrency </Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> Change (24h) </Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> Price </Text></DataTable.Title>
                </DataTable.Header>

                {
                    cryptos && cryptos.map(coin => {
                        {/* addCoin(coin.id) */}
                        const color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                        return (
                            <DataTable.Row key={coin.id} onPress={() => { navigation.navigate('CoinPg', coin) }}>
                                {/* , marginTop: 10, marginRight: 15 */}
                                <DataTable.Cell> <Image source={{ uri: coin.image }} style={{ height: 20, width: 20, marginRight: 15, }} alt="img" /> {coin.id}</DataTable.Cell>
                                <DataTable.Cell numeric><Text style={{ color: color }}>{coin.price_change_percentage_24h.toFixed(2)}%</Text></DataTable.Cell>
                                <DataTable.Cell numeric>${coin.current_price}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })
                }

            </DataTable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 500
    }
})