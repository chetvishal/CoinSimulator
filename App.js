import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './routes/drawer';

export default function App() {
  return (
    <AppNavigator />
  );
}

