import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import { CoinContext } from '../contexts/coinContext';
import { Formik } from 'formik';
import * as yup from 'yup';





export default function CoinPg({ route, navigation }) {

    // const { addCoin, balance } = useContext(CoinContext);

    const reviewSchema = yup.object({
        quantity: yup.number()
            .required()
            .positive()
            .test('postive', 'Quantity should be a positive number', (val) => {
                return parseFloat(val) > 0 ;
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
    const [text, setText] = useState(0);
    return (
        <View>
            <Formik
                initialValues={{ quantity: '' }}
                onSubmit={(values, actions) => {
                    setBalance( balance - (values.quantity * route.params.current_price));
                    addCoin(route.params.id, values.quantity, route.params.current_price)
                    actions.resetForm();
                    navigation.navigate('Market');
                }}
                validationSchema={reviewSchema}
            >
                {
                    (props) => (
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.id}</Text>
                            <TextInput
                                label="Quantity"
                                mode='flat'
                                placeholder="Enter quantity you want to purchase"
                                value={props.values.quantity}
                                onChangeText={props.handleChange('quantity')}
                                keyboardType='numeric'
                            />
                            <Text style={{
                                color: 'crimson',
                                fontWeight: 'bold',
                                marginBottom: 10,
                                marginTop: 6,
                                textAlign: 'center'
                            }}>{props.touched.quantity && props.errors.quantity}</Text>
                            <Button onPress={props.handleSubmit}>
                                Purchase
                            </Button>
                        </View>
                    )
                }
            </Formik>
        </View>
    )
}