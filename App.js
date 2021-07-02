import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { StyleSheet, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Navigation from './src/navigators';
import theme from './src/config/theme';
import { useEffect } from 'react';

export default function App() {
  //console.log(theme)

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="auto" />
      <Navigation />
    </NativeBaseProvider>

  );
}
