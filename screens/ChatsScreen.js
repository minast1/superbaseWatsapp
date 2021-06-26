import { View, } from 'native-base'
import * as firebase from 'firebase'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, StyleSheet, Pressable } from 'react-native'
import Chat from '../components/Chat'
import { CommonActions } from '@react-navigation/native'
import { useStore } from './../store';




const ChatsScreen = ({ navigation }) => {
    const [data, setData] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({

        })

    }, [])


    useEffect(() => {

        const { uid } = firebase.auth().currentUser;
        firebase.firestore().collection('chats').where('userId', '==', uid)
            .onSnapshot((querySnapshot) => {
                let chatData = []
                querySnapshot.forEach((doc) => {
                    const chats = {
                        id: doc.id,
                        name: doc.data().name,
                        photo: doc.data().photo,
                    }
                    chatData.push(chats)
                })
                // console.log(chatData)
                setData(chatData)
            })


    }, [])



    //console.log(data)

    const renderItem = ({ item }) => (
        <Pressable
            android_ripple={{ color: 'lightgray' }}
            onPress={() => navigation.navigate("Chat", { chat: item })}
        >
            <Chat item={item} />
        </Pressable>
    )
    return (
        <View flex={1}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id} />
        </View>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({})
