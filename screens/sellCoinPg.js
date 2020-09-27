import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { Button, TextInput, Paragraph, Dialog, Portal, Provider, Modal } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { CoinContext } from '../contexts/coinContext';

export default function SellCoinPg({ route, navigation }) {

    const [Profit_Loss, setPL] = useState();

    const { removeCoin, balance, setBalance } = useContext(CoinContext);

    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);

    const hideModal = () => setVisible(false);

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
        <View style={{flex: 1}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{route.params.id}</Text>
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
                    <View>
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
                            Sell
                        </Button>
                        <Button onPress={showModal}>
                            Show Modal
                        </Button>

                    </View>
                )
                }
            </Formik>
            <Modal visible={visible} onDismiss={hideModal} >
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={{color: 'black'}}>You've successfully sold your cryptocurrency</Text>
                   { 
                       Profit_Loss > 0 ? <Text style={{color: 'green'}}>You've gained ${Profit_Loss} </Text> : <Text style={{color: 'red'}}>You've lost ${Profit_Loss} </Text>
                       
                    }
                    {/* <Button onPress={hideModal}>
                        Hide Modal
                    </Button> */}
                </View>
            </Modal>
        </View>
    )
}