import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CoinContextProvider from './contexts/coinContext';
import AppNavigator from './routes/drawer';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const getFonts = () => {
  return Font.loadAsync({
    'future-pt-book': require('./assets/fonts/FuturaPTBook.otf'),
    'futura-pt-medium': require('./assets/fonts/FuturaPTMedium.otf'),
    'futura-pt-bold': require('./assets/fonts/FuturaPTBold.otf')
  })
}

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <CoinContextProvider>
        <AppNavigator />
      </CoinContextProvider>
    )
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => { setFontsLoaded(true) }}
      />
    )
  }

  return (
    <CoinContextProvider>
      <AppNavigator />
    </CoinContextProvider>
  );
}

