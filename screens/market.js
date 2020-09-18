import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, DataTable } from 'react-native-paper';
import { CoinContext } from '../contexts/coinContext';

export default function Market() {

    const { coins } = useContext(CoinContext);

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
                        return (
                            <DataTable.Row key={coin.id}>
                                <DataTable.Cell>{coin.id}</DataTable.Cell>
                                <DataTable.Cell numeric>{coin.price_change_24h}</DataTable.Cell>
                                <DataTable.Cell numeric>{coin.current_price}</DataTable.Cell>
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