import { HStack, Icon, Text, View , IconButton} from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, } from 'react-native'
import ChatsScreen from './ChatsScreen';
import StatusScreen from '../../screens/StatusScreen';
import CallsScreen from '../../screens/CallsScreen';
import { FontAwesome} from '@expo/vector-icons';
import { supabase } from '../config/sbaseConfig';






const Tab = createMaterialTopTabNavigator();
const HomeScreen = ({ navigation }) => {
    //Prevent going back to profile screen or auth stack
    const signout = async () => {
        let { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
        }
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'WatsApp',

            headerStyle: { elevation: 0, backgroundColor: '#075E54', },
            headerTitleStyle: { color: 'white', fontSize: 18, fontFamily: 'sans-serif' },
            headerTitleAlign: 'left',
            headerLeft: null,
            headerRight: () => (
                <HStack space={7} pr={5}>
                  <IconButton
                            onPress={() => {
                                signout()
                            }}
                            variant="unstyled"
                            icon={<Icon size="sm" as={FontAwesome} name="power-off" color="white" />}
                        />
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
