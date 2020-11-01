import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Portfolio from '../screens/portfolio';
import SellCoinPg from '../screens/sellCoinPg';

const PortfolioNavigator = ({navigation}) => {
    const {Navigator, Screen} = createStackNavigator();

    return(
        <Navigator
            initialRouteName="Portfolio"
        >
            <Screen 
                name="Portfolio"
                component={Portfolio}
                options={{
                    headerStyle: {
                        height: 90,
                        backgroundColor: '#ffde6a',
                    },
                    headerTitle: 'Portfolio',
                    headerTitleStyle: {
                        fontFamily: 'futura-pt-medium',
                        color: 'black',
                        fontSize: 20
                    }
                }}
            />
            <Screen 
                name="SellCoinPg"
                component={SellCoinPg}
                options={{
                    headerTitle: 'Sell Coin'
                }}
            />

        </Navigator>
    )
}

export default PortfolioNavigator;