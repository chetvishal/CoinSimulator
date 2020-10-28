import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Button, TextInput, DataTable, Modal } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CoinContext } from '../contexts/coinContext';

export default function SellCoinPg({ route, navigation }) {

    const [Profit_Loss, setPL] = useState();

    const { removeCoin, balance, setBalance } = useContext(CoinContext);

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);


    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false
        });
        return () =>
            parent.setOptions({
                tabBarVisible: true
            });
    },[])

    const reviewSchema = yup.object({
        quantity: yup.number()
            .required()
            .test('postive', 'Quantity should be a positive number', (val) => {
                return parseFloat(val) > 0;
            })
            .test('quantity-check', 'Please enter a valid quantity', (val) => {
                return parseFloat(val) <= route.params.qty;
            })
    })

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row',  }}>
                    {/* paddingLeft: 20, */}
                    <Text style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, height: 40, fontSize: 25, paddingHorizontal: 19, paddingTop: 4, marginHorizontal: 5, marginTop: 5, marginBottom: 5, textAlign: 'justify', flexWrap: 'wrap', textAlign: 'left', fontFamily: 'future-pt-book', textTransform: 'capitalize' }}>{route.params.id}</Text>
                </View>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>Avg Purchase Price</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.avg_price}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>Quantity owned</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>{route.params.qty} Coins</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>Current Price</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.current_price}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>Market Cap</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.market_cap}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>24 Hour High</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.high_24h}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>24 Hour Low</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.low_24h}</Text></DataTable.Cell>
                </DataTable.Row>
            </ScrollView>

            <View style={styles.fixedForm}>
                <Formik
                    initialValues={{ quantity: '' }}
                    onSubmit={(values, actions) => {
                        setBalance(balance + (parseFloat(values.quantity) * route.params.current_price));
                        removeCoin(route.params.id, values.quantity);
                        actions.resetForm();
                        setPL(
                            (parseFloat(values.quantity) * route.params.current_price) - (parseFloat(values.quantity) * route.params.avg_price)
                        )
                        showModal()
                        // navigation.navigate('Portfolio');
                    }}
                    validationSchema={reviewSchema}
                >
                    {(props) => (
                        <View style={{ backgroundColor: '#eef2f5' }}>
                            <TextInput
                                label="Quantity"
                                mode='outlined'
                                placeholder="Enter quantity you want to Sell"
                                value={props.values.quantity}
                                onChangeText={props.handleChange('quantity')}
                                keyboardType='numeric'
                                style={styles.textInput}
                            />
                            <Text style={{
                                color: 'crimson',
                                fontWeight: 'bold',
                                marginBottom: 10,
                                marginTop: 6,
                                textAlign: 'center'
                            }}>{props.touched.quantity && props.errors.quantity}</Text>
                            <Button onPress={props.handleSubmit} mode="contained" color="black" style={styles.button}>
                                Sell
                            </Button>
                            {/* <Button onPress={showModal}>
                            Show Modal
                        </Button> */}

                        </View>
                    )
                    }
                </Formik>
            </View>
            <Modal visible={visible} onDismiss={hideModal} >
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={{ color: 'black' }}>You've successfully sold your cryptocurrency</Text>
                    {
                        Profit_Loss > 0 ? <Text style={{ color: 'green' }}>You've gained ${parseFloat(Profit_Loss).toFixed(2)} </Text> : <Text style={{ color: 'red' }}>You've lost ${parseFloat(Profit_Loss).toFixed(2)} </Text>

                    }
                    {/* <Button onPress={hideModal}>
                        Hide Modal
                    </Button> */}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    fixedForm: {
        // flexDirection: 'column',
        // flex: 1,
        justifyContent: 'center',
        // position: 'absolute',
        marginBottom: 0,
        bottom: 0,
        backgroundColor: 'white'
    },
    textInput: {
        borderRadius: 40,
        marginHorizontal: 10,
        marginTop: 10,
    },
    button: {
        marginBottom: 5,
        borderRadius: 20,
        marginHorizontal: 10
    },

})