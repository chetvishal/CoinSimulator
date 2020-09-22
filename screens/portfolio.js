import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { CoinContext } from '../contexts/coinContext';
import { Card, Title, Paragraph, DataTable, Button } from 'react-native-paper';
import { fetchCoins } from '../contexts/coinContext';

export default function Portfolio({ navigation }) {
    const { favCoin } = useContext(CoinContext);

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCoins(await fetchCoins());
        };

        fetchAPI();

        // favCoin.map(coin => {

        // })
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
                    coins && coins.map(coin => {
                        {/* addCoin(coin.id) */ }
                        const color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                        const txt = `coin.id === 'ripple' || coin.id === 'dogecoin' || coin.id === 'tron'`
                        const condition = "coin.id === 'bitcoin' || coin.id === 'ripple' || coin.id === 'dogecoin' || coin.id === 'tron'";
                        var i = 0;

                        while (i < favCoin.length) {
                            if (coin.id === favCoin[i].coin) {
                                return (
                                    <DataTable.Row key={coin.id} onPress={() => { navigation.navigate('CoinPg', coin) }}>
                                        {/* , marginTop: 10, marginRight: 15 */}
                                        <DataTable.Cell> <Image source={{ uri: coin.image }} style={{ height: 20, width: 20, marginRight: 15, }} alt="img" /> {coin.id}</DataTable.Cell>
                                        <DataTable.Cell numeric><Text style={{ color: color }}>{coin.price_change_percentage_24h.toFixed(2)}%</Text></DataTable.Cell>
                                        <DataTable.Cell numeric>${coin.current_price}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                                break;
                            }
                            i++;
                        }
                    })
                }
            </DataTable>
            <Button onPress={() => { console.log(favCoin.length) }}>press me</Button>
        </ScrollView>
    )



    // return favCoin.length ? (
    //     <View style={{ marginTop: 20 }}>
    //         {
    //             favCoin.map(coin => {
    //                 return (
    //                     <Text style={{ marginTop: 20 }} key={coin.key}>{coin.coin}</Text>
    //                 )
    //             })
    //         }
    //         {/* <Button onPress={() => console.log(favCoinData)} title="he me"/>  */}
    //     </View>
    // ) : (
    //         <View><Text>No coins to show</Text></View>
    //     );
}


const styles = StyleSheet.create({
    text: {
        marginTop: 45,
        fontWeight: 'bold'
    }
})