import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button, Card, Title, Paragraph, DataTable } from 'react-native-paper';
import { fetchCoins } from '../contexts/coinContext';

export default function Market({ navigation }) {

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
            {/*datatable header previous bg color:  #eef2f5 */}
                <DataTable.Header style={{backgroundColor: '#eef2f5', height: 45}}>
                    <DataTable.Title><Text style={{ fontSize: 15, fontWeight: 'normal', color: 'black', fontFamily: 'futura-pt-medium' }}> Coin </Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ fontSize: 15, fontWeight: 'normal',  color: 'black' , fontFamily: 'futura-pt-medium'}}> 24h </Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ fontSize: 15, fontWeight: 'normal', color: 'black', fontFamily: 'futura-pt-medium' }}> Price </Text></DataTable.Title>
                </DataTable.Header>

                {
                    cryptos && cryptos.map(coin => {
                        {/* addCoin(coin.id) */}
                        const color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                        return (
                            <TouchableOpacity key={coin.id} onPress={() => { navigation.navigate('CoinPg', coin) }}>
                            <DataTable.Row style={{backgroundColor: 'white', height: 70}} >
                                {/* , marginTop: 10, marginRight: 15 */}
                                <DataTable.Cell > <Image source={{ uri: coin.image }} style={{ height: 20, width: 20, marginRight: 15, }} alt="img" /> <Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'future-pt-book' }}>{coin.id}</Text></DataTable.Cell>
                                <DataTable.Cell numeric><Text style={{ color: color, fontWeight: 'normal', fontSize: 17 , fontFamily: 'future-pt-book'}}>{coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : 0.0}%</Text></DataTable.Cell>
                                <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17 , fontFamily: 'future-pt-book'}}>${coin.current_price}</Text></DataTable.Cell>
                            </DataTable.Row>
                            </TouchableOpacity>
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