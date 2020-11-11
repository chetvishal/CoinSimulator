import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Button, TextInput, DataTable } from 'react-native-paper';
import { CoinContext } from '../contexts/coinContext';
import { Formik } from 'formik';
import * as yup from 'yup';
import { LineChart } from "react-native-chart-kit";
import { fetchCoinChart } from '../contexts/coinContext';
import { ScrollView } from 'react-native-gesture-handler';


export default function CoinPg({ route, navigation, }) {

    // const { addCoin, balance } = useContext(CoinContext);
    // navigation.setParams(route.params.id)
    

    const [arr, setArr] = useState([]);

    const fetchAPI = async (days) => {
        setArr(await fetchCoinChart(route.params.id, days));
    };

    useEffect(() => {
        

        // fetchAPI(2)

        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false
        });
        return () =>
            parent.setOptions({
                tabBarVisible: true
            });

    }, []);

    const reviewSchema = yup.object({
        quantity: yup.number()
            .required()
            .positive()
            .test('postive', 'Quantity should be a positive number', (val) => {
                return parseFloat(val) > 0;
            })
            // .test('less-than-10k', 'At one time you can only purchase less than 10 thousand coins', (val) => {
            //     return parseInt(val) < 10000;
            // })
            .test('balance-check', 'your balance is not sufficient', (val) => {
                return (parseFloat(val) * route.params.current_price) < balance;
            })
    })

    // console.log(route)
    const { addCoin, balance, setBalance } = useContext(CoinContext);

    const commitsData = [0];

    //This function loops
    const setCommitData = () => {
        for (var i = 0; i < arr.prices.length; i++) {
            for (var j = 0; j < 2; j++) {
                commitsData[i] = arr.prices[i][1];
            }
        }
    }
    if (arr.length !== 0)
        setCommitData();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {/* Line code starts */}
                <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
                    {/* paddingLeft: 20, */}
                    <Text onPress={() => fetchAPI(2)} style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, height: 40, fontSize: 25, paddingHorizontal: 19, paddingTop: 4, marginHorizontal: 5, marginTop: 10, textAlign: 'justify', flexWrap: 'wrap', textAlign: 'left', fontFamily: 'future-pt-book' }}>2 Days</Text>
                    <Text onPress={() => fetchAPI(7)} style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, height: 40, fontSize: 25, paddingHorizontal: 19, paddingTop: 4, marginHorizontal: 5, marginTop: 10, textAlign: 'justify', flexWrap: 'wrap', textAlign: 'left', fontFamily: 'future-pt-book' }}>7 Days</Text>
                    <Text style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, height: 40, fontSize: 25, paddingHorizontal: 19, paddingTop: 4, marginHorizontal: 5, marginTop: 10, textAlign: 'justify', flexWrap: 'wrap', textAlign: 'left', fontFamily: 'future-pt-book', textTransform: 'capitalize' }}>{route.params.id}</Text>
                </View>

                <LineChart
                    data={
                        {
                            datasets: [
                                {
                                    data: commitsData
                                }
                            ],
                        }
                    }
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    xAxisLabel="m"
                    chartConfig={{
                        backgroundColor: "#0036cc",
                        backgroundGradientFrom: "#0044ff",
                        backgroundGradientTo: "#4778ff",
                        decimalPlaces: 3, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "3",
                            strokeWidth: "2",
                            stroke: "#4778ff"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        // borderRadius: 16
                    }}
                />
                {/* Line code ends */}
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
                        setBalance(balance - (values.quantity * route.params.current_price));
                        addCoin(route.params.id, values.quantity, route.params.current_price)
                        actions.resetForm();
                        navigation.navigate('Market');
                    }}
                    validationSchema={reviewSchema}
                >
                    {
                        (props) => (
                            <View style={{ backgroundColor: '#eef2f5' }}>
                                {/* <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.id}</Text> */}
                                <TextInput
                                    label="Quantity"
                                    mode='outlined'
                                    placeholder="Enter quantity you want to purchase"
                                    value={props.values.quantity}
                                    onChangeText={props.handleChange('quantity')}
                                    keyboardType='numeric'
                                    style={styles.textInput}
                                />
                                <Text style={{
                                    color: 'crimson',
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    marginTop: 2,
                                    textAlign: 'center',
                                    fontFamily: 'future-pt-book'
                                }}>{props.touched.quantity && props.errors.quantity}</Text>


                                <Button onPress={props.handleSubmit} style={styles.button} mode="contained" color="black">
                                    Purchase
                                </Button>
                            </View>
                        )
                    }
                </Formik>
            </View>

            {/* <Button style={styles.button}>
                Purchase
            </Button> */}
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
    button: {
        marginBottom: 5,
        borderRadius: 20,
        marginHorizontal: 10
    },
    textInput: {
        borderRadius: 40,
        marginHorizontal: 10,
        marginTop: 10,
    }

})