import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import firebase from '../fireConfig';
import { useStore } from '../store';
import ChatScreen from '../screens/ChatScreen';


const Stack = createStackNavigator();
const AppStack = () => {

    return (
        <Stack.Navigator
            headerMode="screen">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator >
    )

}

export default AppStack
