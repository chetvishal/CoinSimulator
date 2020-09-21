import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Market from '../screens/market';
import CoinPg from '../screens/coinPg';

const MarketNavigator = ({navigation}) => {
    const {Navigator, Screen} = createStackNavigator();

    return(
        <Navigator
            initialRouteName="Market"
        >
            <Screen
                name="Market"
                component={Market}
                options={{
                    headerStyle: {
                        height: 60
                    }
                }}
            />
            <Screen 
                name="CoinPg"
                component={CoinPg}
                options={{title: 'Coin Details'}}
            />
        </Navigator>
    )
}

export default MarketNavigator;