import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { CoinContext } from '../contexts/coinContext';
import { Card, Title, Paragraph, DataTable, Button, Dialog, Portal, Provider } from 'react-native-paper';
import { fetchCoins } from '../contexts/coinContext';

export default function Portfolio({ navigation }) {
    const { favCoin, balance } = useContext(CoinContext);

    const [coins, setCoins] = useState([]);
    const [portfolio, setPortfolio] = useState(0);

    var sum = 0;
    var ctr = 0;

    useEffect(() => {
        const fetchAPI = async () => {
            setCoins(await fetchCoins());
        };

        fetchAPI()
    }, [coins]);

    const portfolioValue = () => {
        coins && coins.map(coin => {
            var i = 0;
            while (i < favCoin.length) {
                if (coin.id === favCoin[i].coin) {
                    sum = sum + favCoin[i].qty * coin.current_price;
                    break;
                }
                i++;
            }
        })
    }
    portfolioValue();

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <ScrollView>
            <Provider>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Card>

                    <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <Paragraph >Portfolio Value</Paragraph>
                            <Title>${sum.toFixed(2)}</Title>
                        </View>
                        <View style={{}}>
                            <Paragraph >Balance</Paragraph>
                            <Title>${balance.toFixed(2)}</Title>
                        </View>
                    </Card.Content>
                </Card>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title><Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> Coin </Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> 24h </Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> Price </Text></DataTable.Title>
                        <DataTable.Title numeric><Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}> Holdings </Text></DataTable.Title>
                    </DataTable.Header>

                    {
                        coins && coins.map(coin => {
                            const color = coin.price_change_percentage_24h > 0 ? 'green' : 'red';
                            var i = 0;
                            while (i < favCoin.length) {
                                if (coin.id === favCoin[i].coin) {
                                    return (

                                        <DataTable.Row key={coin.id} onPress={() => {
                                            navigation.navigate('SellCoinPg', {
                                                id: coin.id, 
                                                current_price: coin.current_price,
                                                qty: favCoin[i].qty,
                                                avg_price: favCoin[i].avg_price
                                            })
                                        }}>
                                            {/* coin, favCoin[i].qty */}
                                            {/* , marginTop: 10, marginRight: 15 */}
                                            <DataTable.Cell> <Image source={{ uri: coin.image }} style={{ height: 20, width: 20, marginRight: 15, }} alt="img" /> {coin.symbol}</DataTable.Cell>
                                            <DataTable.Cell numeric><Text style={{ color: color }}>{coin.price_change_percentage_24h.toFixed(2)}%</Text></DataTable.Cell>
                                            <DataTable.Cell numeric>${coin.current_price.toFixed(2)}</DataTable.Cell>
                                            <DataTable.Cell numeric>{favCoin[i].qty}</DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                }

                                i++;
                            }
                        })

                    }


                </DataTable>
                <Button onPress={() => console.log(favCoin)}>press me</Button>

            </Provider>
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