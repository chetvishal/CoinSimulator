import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Market from '../screens/market'
import Account from '../screens/account'
import Portfolio from '../screens/portfolio'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export const RootDrawerNavigator = () => (

    <Navigator initialRouteName="Market">
        <Screen
            name="Market"
            component={Market}
            options={{
                tabBarIcon: () => (
                    <Entypo name="shop" size={24} color="black" />
                ),
            }}
        />
        <Screen
            name="Portfolio"
            component={Portfolio}
            options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="finance" size={24} color="black" />
                ),
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