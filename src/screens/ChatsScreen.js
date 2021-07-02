import { View, } from 'native-base'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Pressable ,LogBox} from 'react-native'
import Chat from '../components/Chat'
import { supabase } from '../config/sbaseConfig';
import 'react-native-url-polyfill/auto'


LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const ChatsScreen = ({ navigation }) => {
    const [superChat, setChat] = useState(null)
     
    let { id }  = supabase.auth.user()
      
     const getUserChats = async () => {
         
            let { data} = await supabase
            .from('chats')
            .select('id, name, photo')
            .filter('user_id', 'eq', id)
            .order('createdAt', {ascending : true})
               
               setChat(data)
          
    }
   
     useEffect(() => {
        getUserChats()
         
     }, [])



   

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
                data={superChat}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()} />
        </View>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({})
