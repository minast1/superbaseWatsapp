import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import VerifyScreen from '../screens/VerifyScreen';
import ProfileScreen from '../screens/ProfileScreen';



const Stack = createStackNavigator();
const AuthStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={LoginScreen} options={{
                title: 'Verify your phone number',
                headerStyle: {
                    backgroundColor: '#075E54',
                    elevation: 0
                },
                headerTitleStyle: { color: 'white', fontSize: 18, fontFamily: 'sans-serif' },
                headerTitleAlign: 'center'

            }} />

            <Stack.Screen name="Verify" component={VerifyScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack
