import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Button, TextInput, DataTable } from 'react-native-paper';
import { CoinContext } from '../contexts/coinContext';
import { Formik } from 'formik';
import * as yup from 'yup';
// import { LineChart } from "react-native-chart-kit";
import { fetchCoinChart } from '../contexts/coinContext';
import { ScrollView } from 'react-native-gesture-handler';

import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {
    LineChart,
    YAxis,
    XAxis,
    BarChart,
    G,
    Line,
} from 'react-native-svg-charts';

export function Chartx(props, navigation) {
    const id = props;
    const [days, setDays] = useState(2);
    const [cat, setCat] = useState('p_cat1.png');
    const ChartUrl =
        'https://api.coingecko.com/api/v3/coins/' +
        id +
        '/market_chart?vs_currency=usd&days=+' +
        days;
    const url1 = 'https://reactnative.dev/docs/assets/' + cat;
    const [isLoading, setisLoading] = useState(true);
    const [chartData, setChartData] = useState(true);
    const [bt, setbt] = useState(0);

    useEffect(() => {
        async function fetchCoinChart() {
            await fetch(ChartUrl)
                .then((response) => response.json())
                .then((json) => {
                    setChartData(json.prices);
                })
                .catch(function(error) { console.log(error) })
                .finally(setisLoading(false));
        }

        fetchCoinChart()

    }, [days]);
    //Chart Data
    //fetching data

    var xVal = [];
    var yVal = [];
    for (var key in chartData) {
        xVal.push(key);
        yVal.push(chartData[key]['1']);
    }
    console.log(chartData);
    const contentInset = { top: 10, bottom: 10 };

    return (
        <View>
            <ScrollView
                horizontal={true}
            >
                <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
                    {/* paddingLeft: 20, */}
                    <Text onPress={() => setDays(2)} style={styles.daysBtn}>
                        2 Days
                    </Text>
                    <Text onPress={() => setDays(7)} style={styles.daysBtn}>
                        7 Days
          </Text>
                    <Text onPress={() => setDays(30)} style={styles.daysBtn}>
                        30 Days
          </Text>
                    <Text onPress={() => setDays(60)} style={styles.daysBtn}>
                        60 Days
          </Text>
                    <Text onPress={() => setDays(180)} style={styles.daysBtn}>
                        180 Days
          </Text>
                    <Text onPress={() => setDays(365)} style={styles.daysBtn}>
                        365 Days
          </Text>
                    <Text
                        style={styles.daysBtn}>
                        {id}
                    </Text>
                </View>
            </ScrollView>
            {/* <Text> {days} DAYS</Text> */}
            <View
                style={{
                    height: 300,
                    flexDirection: 'row',
                    paddingLeft: 5,
                    paddingRight: 5,
                }}>
                <YAxis
                    data={yVal}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 12,
                    }}
                    numberOfTicks={5}
                    formatLabel={(value) => '$' + `${value}`}
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16, }}
                    data={yVal}
                    svg={{ stroke: 'skyblue', strokeWidth: 4 }}
                    contentInset={contentInset}>
                    <Grid />
                </LineChart>
            </View>
        </View>
    );
}


export default function CoinPg({ route, navigation, }) {

    // const { addCoin, balance } = useContext(CoinContext);
    // navigation.setParams(route.params.id)


    const [arr, setArr] = useState([]);

    // const fetchAPI = async (days) => {
    //     setArr(await fetchCoinChart(route.params.id, days));
    // };

    // useEffect(() => {

    //     fetchAPI(2)

    //     const parent = navigation.dangerouslyGetParent();
    //     parent.setOptions({
    //         tabBarVisible: false
    //     });
    //     return () =>
    //         parent.setOptions({
    //             tabBarVisible: true
    //         });

    // }, []);

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

    // const commitsData = [0];

    // //This function loops
    // const setCommitData = () => {
    //     for (var i = 0; i < arr.prices.length; i++) {
    //         for (var j = 0; j < 2; j++) {
    //             commitsData[i] = arr.prices[i][1];
    //         }
    //     }
    // }
    // if (arr.length !== 0)
    //     setCommitData();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {/* Line code starts */}
                <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row' }}>
                    {/* paddingLeft: 20, */}
                    {/* <Text onPress={() => fetchAPI(2)} style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, height: 40, fontSize: 25, paddingHorizontal: 19, paddingTop: 4, marginHorizontal: 5, marginTop: 10, textAlign: 'justify', flexWrap: 'wrap', textAlign: 'left', fontFamily: 'future-pt-book' }}>2 Days</Text>
                    <Text onPress={() => fetchAPI(7)} style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, height: 40, fontSize: 25, paddingHorizontal: 19, paddingTop: 4, marginHorizontal: 5, marginTop: 10, textAlign: 'justify', flexWrap: 'wrap', textAlign: 'left', fontFamily: 'future-pt-book' }}>7 Days</Text>
                    <Text style={{ backgroundColor: 'black', color: 'white', borderRadius: 20, height: 40, fontSize: 25, paddingHorizontal: 19, paddingTop: 4, marginHorizontal: 5, marginTop: 10, textAlign: 'justify', flexWrap: 'wrap', textAlign: 'left', fontFamily: 'future-pt-book', textTransform: 'capitalize' }}>{route.params.id}</Text> */}
                </View>

                {Chartx(route.params.id)}

                {/* <LineChart
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
                /> */}
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

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>Circulating supply</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.circulating_supply}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>Total supply</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.total_supply}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>Max supply</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.max_supply}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={{ backgroundColor: 'white', height: 70 }}>
                    {/* , marginTop: 10, marginRight: 15 */}
                    <DataTable.Cell ><Text style={{ fontWeight: 'normal', fontSize: 17, textTransform: 'capitalize', fontFamily: 'futura-pt-bold' }}>24H Change</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ fontWeight: 'normal', fontSize: 17, fontFamily: 'futura-pt-medium' }}>${route.params.price_change_24h}</Text></DataTable.Cell>
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
        backgroundColor: 'white',
    },
    button: {
        marginBottom: 5,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    textInput: {
        borderRadius: 40,
        marginHorizontal: 10,
        marginTop: 10,
    },
    daysBtn: {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: 20,
        height: 40,
        fontSize: 15,
        paddingHorizontal: 19,
        paddingTop: 4,
        marginHorizontal: 5,
        marginTop: 10,
        textAlign: 'justify',
        flexWrap: 'wrap',
        textAlign: 'left',
        fontFamily: 'future-pt-book',
    },
});