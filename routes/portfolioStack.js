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
                        height: 60
                    }
                }}
            />
            <Screen 
                name="SellCoinPg"
                component={SellCoinPg}
            />

        </Navigator>
    )
}

export default PortfolioNavigator;