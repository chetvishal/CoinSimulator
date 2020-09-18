import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CoinContextProvider from './contexts/coinContext';
import AppNavigator from './routes/drawer';

export default function App() {
  return (
    <CoinContextProvider>
      <AppNavigator />
    </CoinContextProvider>
  );
}

