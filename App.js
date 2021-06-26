import React, { useEffect } from 'react';
import { NativeBaseProvider, extendTheme, } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
//import firebase from './fireConfig';
import { useStore } from './store';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
import * as firebase from 'firebase'



export default function App() {
  const authUser = useStore(state => state.authUser);
  const hasProfile = useStore(state => state.hasProfile)
  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: () => {
          return {
            letterSpacing: 'wider',
            color: 'white',
            fontWeight: 'semibold',
            fontSize: 'xl'
          }
        }
      },

    }
  })

  useEffect(() => {

    const unsubsribeAuth = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).
          then(() => { }).catch(error => { });
        useStore.setState({ authUser: user })
        useStore.setState({ hasProfile: true })
      } else {

      }
    });
    return unsubsribeAuth
  }, [])


  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="light" backgroundColor="#075E54" translucent={false} />
      <NavigationContainer>
        {authUser && hasProfile ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

