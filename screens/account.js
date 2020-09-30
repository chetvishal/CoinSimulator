import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, TextInput } from 'react-native-paper'

export default function Account() {

    const [text, setText] = useState('');
    const [textArray, setArrayText] = useState(['vishal', 'leena', 'meena', 'hele', 'babbey']);

    const handleSubmit = async () => {
        try {
            await AsyncStorage.setItem(
                'MyText',
                JSON.stringify(textArray)
            ).then(() => {console.log('successfully updated data')})
        } catch (error) {
            console.log('error handleSubmit: ', error);
        }
    }

    const handleCheck = async () => {
        try {
            const value = await AsyncStorage.getItem('FAVCOINS1')
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value));
            }else{
                console.log('array is empty')
            }
        } catch (error) {
            console.log('error handleChekc: ', error)
        }
    }

    return (
        <View>
            <Text style={styles.text}>Account</Text>
            <TextInput
                label="Quantity"
                mode='flat'
                placeholder="Enter quantity you want to purchase"
                onChangeText={val => setText(val)}
            />
            {/* onChangeText={val => setArrayText(text => [...text, val])} */}
            <Button
                onPress={() => { 
                    setArrayText(textArray => [...textArray, text]);
                    handleSubmit()
                    }}
            >
                Submit text
            </Button> 

             <Button
                onPress={handleCheck}
            >
                Check local data
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 45,
        fontWeight: 'bold'
    }
})