import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Portfolio() {
    return(
        <View>
            <Text style={styles.text}>Portfolio</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: 45
    }
})