import { HStack, Icon, Text, View } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, } from 'react-native'
import ChatsScreen from './ChatsScreen';
import StatusScreen from './StatusScreen';
import CallsScreen from './CallsScreen';
import { backgroundColor, color } from 'styled-system';





const Tab = createMaterialTopTabNavigator();
const HomeScreen = ({ navigation }) => {
    //Prevent going back to profile screen or auth stack
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => e.preventDefault())

    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'WatsApp',

            headerStyle: { elevation: 0, backgroundColor: '#075E54', },
            headerTitleStyle: { color: 'white', fontSize: 18, fontFamily: 'sans-serif' },
            headerTitleAlign: 'left',
            headerLeft: null,
            headerRight: () => (
                <HStack space={7} pr={3}>
                    <Icon type="FontAwesome5" name="search" color="white" />
                    <Icon type="Ionicons" name="ellipsis-vertical" color="white" />
                </HStack>
            )
        })

    }, [])

    return (
        <Tab.Navigator
            swipeEnabled={true}

            tabBarOptions={{
                style: { elevation: 0, backgroundColor: '#075E54', paddingBottom: 10 },
                activeTintColor: 'white',
                inactiveTintColor: 'gray',
                indicatorStyle: { borderBottomWidth: 4, borderBottomColor: 'white' },


            }}>
            <Tab.Screen name="Chats" component={ChatsScreen} />
            <Tab.Screen name="Status" component={StatusScreen} />
            <Tab.Screen name="Calls" component={CallsScreen} />
        </Tab.Navigator>

    )
}

export default HomeScreen

const styles = StyleSheet.create({})
