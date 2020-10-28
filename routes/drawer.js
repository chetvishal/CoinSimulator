import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MarketNavigator from './marketStack'
import Account from '../screens/account'
import PortfolioNavigator from './portfolioStack'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export const RootDrawerNavigator = () => (
    <Navigator initialRouteName="Market" 
         tabBarOptions={{
        activeTintColor: '#414e54',
        inactiveTintColor: '#7f8a9c',
        labelStyle: {
            fontFamily: 'future-pt-book',
            fontSize: 13
        }
        
        // #414e54
        // activeBackgroundColor: 'white',
        // inactiveBackgroundColor: 'white',
      }}
    >
        <Screen
            name="Market"
            component={MarketNavigator}
            options={{
                tabBarIcon: ({color}) => (
                    <Entypo name="shop" size={30} color={color}/>
                ),

                tabBarLabel: 'Market',
                
                
            }}
        />
        <Screen
            name="PortfolioNavigator"
            component={PortfolioNavigator}
            options={{
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name="finance" size={30} color={color}  />
                ),
                tabBarLabel: 'Portfolio',
                
                // title:"Portfolio"
                
            }}
        />
        
        {/* <Screen
            name="Account"
            component={Account}
            options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="account" size={24} color="black" />
                ),
            }}
        /> */}

    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <RootDrawerNavigator />
    </NavigationContainer>
);

export default AppNavigator;