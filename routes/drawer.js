import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MarketNavigator from './marketStack'
import Account from '../screens/account'
import PortfolioNavigator from './portfolioStack'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export const RootDrawerNavigator = () => (
    <Navigator initialRouteName="Market">
        <Screen
            name="Market"
            component={MarketNavigator}
            options={{
                tabBarIcon: () => (
                    <Entypo name="shop" size={24} color="black" />
                ),
            }}
        />
        <Screen
            name="PortfolioNavigator"
            component={PortfolioNavigator}
            options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="finance" size={24} color="black" />
                ),
                title:"Portfolio"
            }}
        />
        
        <Screen
            name="Account"
            component={Account}
            options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="account" size={24} color="black" />
                ),
            }}
        />

    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <RootDrawerNavigator />
    </NavigationContainer>
);

export default AppNavigator;