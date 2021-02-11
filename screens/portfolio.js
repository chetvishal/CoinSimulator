import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { CoinContext } from '../contexts/coinContext';
import { Card, Title, Paragraph, DataTable, Button, Dialog, Portal, Provider } from 'react-native-paper';
import { fetchCoins } from '../contexts/coinContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Portfolio({ navigation }) {
    const { favCoin, balance, getLocal, arr } = useContext(CoinContext);

    const [coins, setCoins] = useState([]);

    var sum = 0;

    useEffect(() => {
        const fetchAPI = async () => {
            setCoins(await fetchCoins(150));
        };

        fetchAPI()
    }, [coins]);

    const portfolioValue = () => {
        favCoin && coins && coins.map(coin => {
            var i = 0;
            while (i < favCoin.length) {
                if (coin.id === favCoin[i].coin && favCoin[i].qty !== 0) {
                    sum = sum + favCoin[i].qty * coin.current_price;
                    break;
                }
                i++;
            }
        })
    }
    portfolioValue();

    return (
        <ScrollView>

            <Card>

                <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View>
                        <Paragraph style={{ fontFamily: 'futura-pt-medium', fontSize: 15 }}>Portfolio Value</Paragraph>
                        <Title style={{ fontFamily: 'futura-pt-bold', fontWeight: 'bold' }}>${sum.toFixed(2)}</Title>
                    </View>
                    <View style={{}}>
                        <Paragraph style={{ fontFamily: 'futura-pt-medium', fontSize: 15 }}>Balance</Paragraph>
                        <Title style={{ fontFamily: 'futura-pt-bold', fontWeight: 'bold' }}>${balance.toFixed(2)}</Title>
                    </View>
                </Card.Content>
            </Card>
            <DataTable>
                <DataTable.Header style={{ backgroundColor: '#eef2f5', height: 45 }}>
                    <DataTable.Title><Text style={{ fontSize: 15, fontWeight: 'normal', color: 'black', fontFamily: 'futura-pt-medium' }}> Coin </Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ fontSize: 15, fontWeight: 'normal', color: 'black', fontFamily: 'futura-pt-medium' }}> 24h </Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ fontSize: 15, fontWeight: 'normal', color: 'black', fontFamily: 'futura-pt-medium' }}> Price </Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ fontSize: 15, fontWeight: 'normal', color: 'black', fontFamily: 'futura-pt-medium' }}> Holdings </Text></DataTable.Title>
                </DataTable.Header>

                {
                    favCoin && coins && coins.map(coin => {
                        const color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                        var i = 0;
                        while (i < favCoin.length) {
                            if (coin.id === favCoin[i].coin) {
                                return (

                                    <TouchableOpacity
                                        key={coin.id}
                                        onPress={() => {
                                            navigation.navigate('SellCoinPg', {
                                                id: coin.id,
                                                current_price: coin.current_price,
                                                qty: favCoin[i].qty,
                                                avg_price: favCoin[i].avg_price,
                                                market_cap: coin.market_cap,
                                                high_24h: coin.high_24h,
                                                low_24h: coin.low_24h,
                                                circulating_supply: coin.circulating_supply,
                                                total_supply: coin.total_supply,
                                                max_supply: coin.max_supply,
                                                price_change_24h: coin.price_change_24h
                                            })
                                        }}
                                    >
                                        <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                                            {/* coin, favCoin[i].qty */}
                                            {/* , marginTop: 10, marginRight: 15 */}
                                            <DataTable.Cell> <Image source={{ uri: coin.image }} style={{ height: 20, width: 20, marginRight: 15, }} alt="img" /> <Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'future-pt-book' }}>{coin.symbol}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric><Text style={{ color: color, fontWeight: 'normal', fontSize: 17, fontFamily: 'future-pt-book' }}>{coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : 0.0}%</Text></DataTable.Cell>
                                            <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'future-pt-book' }}>${coin.current_price.toFixed(2)}</Text></DataTable.Cell>
                                            <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'future-pt-book' }}>{favCoin[i].qty}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    </TouchableOpacity>
                                )
                            }
                            i++;
                        }
                    })

                }

            </DataTable>
            {/* <Button onPress={() => console.log(favCoin)}>press me</Button>
            <Button onPress={() => console.log(JSON.stringify(getLocal()))}>getLocal me</Button>
            <Button onPress={() => console.log(favCoin)}>arr me</Button> */}

        </ScrollView>
    )

}


const styles = StyleSheet.create({
    text: {
        marginTop: 45,
        fontWeight: 'bold'
    }
})