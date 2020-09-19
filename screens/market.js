import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Button, Card, Title, Paragraph, DataTable } from 'react-native-paper';
import { CoinContext, fetchCoins } from '../contexts/coinContext';

export default function Market() {

    const { coins } = useContext(CoinContext);
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
                        const color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                        return (
                            <DataTable.Row key={coin.id}>
                                <Image source={{ uri: coin.image }} style={{height: 30, width: 30, marginTop: 10, marginRight: 15}} alt="img"/>       
                                <DataTable.Cell>{coin.id}</DataTable.Cell>
                                <DataTable.Cell numeric><Text style={{color: color}}>{coin.price_change_percentage_24h}%</Text></DataTable.Cell>
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