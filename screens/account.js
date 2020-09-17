import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Account() {
    return(
        <View>
            <Text style={styles.text}>Account</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 45
    }
})