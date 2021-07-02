import { Avatar, Box, Button, HStack, Icon, IconButton, Input, Text, View } from 'native-base'
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { StyleSheet, ImageBackground, LogBox, Pressable, } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import chatBackround from '../../assets/watsapp/chatBackground.png'
import ChatHeader from '../components/ChatHeader'
import InputBox from '../components/InputBox'
import { useStore } from '../stores/userStore';
import { Ionicons  } from '@expo/vector-icons';
import { supabase } from '../config/sbaseConfig';
import 'react-native-url-polyfill/auto'
import Composer from '../components/Composer'
import LeftIcon from '../components/LeftIcon'


LogBox.ignoreLogs([' The contrast ratio of 1.5869276981034446:1 for gray.500 on #075E54']);


const ChatScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState(null);
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [audio, setAudio] = useState("");
    const text = useStore(state => state.text);
    const {id}  = supabase.auth.user()
    
    const { chat } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#075E54',
                elevation: 8,
                height: 85,
            },
            headerTitleStyle : {
                flex : 1
            },
            
            headerTitle: props => <ChatHeader {...props} chat={chat} />,

        })

    }, []);


    const getMessages = async () => {
        let { data } = await supabase
            .from('messages')
            .select(`_id, text ,createdAt , pending,
            user : userId(_id , name)`)
            .filter('chatId', 'eq', chat.id)

      setMessages(data)
    }
   
   useEffect(() => {
        // Load all the messages for this chat
             getMessages()
        //Listen to realtime events from the messages table
        const mySubscription = supabase
            .from('messages')
            .on('*', () => getMessages())
            .subscribe()

        return () =>   supabase.removeSubscription(mySubscription)

    }, []) 
     
     //console.log(messages)
    const onSend = async () => {
        /* setMessages(previousMessages => GiftedChat.append(previousMessages, messages)) */
        const { data, error } = await supabase
        .from('messages')
        .insert([
            { text: text, 
                chatId: chat.id ,
                userId : id,
                  pending: false,
                image: image, 
                video: video,
                audio: audio
     
            }])
    
        useStore.setState({ text: '' }) 
    }

    //  console.log(messages)
    return (
        <View justifyContent="center" flex={1}>
            <ImageBackground source={chatBackround} style={styles.image}>
                <GiftedChat
                    timeTextStyle={{ right: { color: 'gray' } }}
                    loadEarlier={true}
                    inverted
                    bottomOffset={-10}
                    text={text}
                    messages={messages}
                    onSend={() => onSend()}
                    user={{
                        _id: id,
                    }}
                     
                    renderInputToolbar={(props) => <InputBox {...props} />}
                    alwaysShowSend={true}
                     renderComposer = { (props) => {
                         return <Composer {...props}/>
                     } }
                    renderSend={(props) => {
                        return (
                            <Send {...props}>

                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="#128C7E"
                                    style={styles.sendButtton}
                                      
                                >
                                     <Icon as={ <Ionicons  name="ios-paper-plane-sharp" />}   
                                        color="white"
                                        size={6}
                                        style={{ transform: [{ rotateZ: '410deg' }] }}/>   
                                </Box>
                            </Send>
                        )
                    }}
                    scrollToBottom
                    renderBubble={(props) => <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: "#dcf8c6",
                                marginBottom : 10

                            }
                        }}
                        textStyle={{
                            right: { color: 'black' }
                        }}

                    />}

                />
            </ImageBackground>

        </View>

    )
}

export default ChatScreen

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
    },
    sendButtton: {
        marginTop: 8,
        marginRight: 3,
        paddingRight: 5,
        height: 45,
        width: 45,
        marginLeft: 5,
        borderRadius: 30,
        borderWidth: 0.2
    }

})
