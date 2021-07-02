import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { FontAwesome } from '@expo/vector-icons';
import ChatScreen from '../screens/ChatScreen';




const Stack = createStackNavigator()
const MainStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen}/>
        </Stack.Navigator>
    )
}

export default MainStack

