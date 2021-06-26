import { Avatar, Box, Button, HStack, Icon, IconButton, Input, Text, View } from 'native-base'
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react'
import { StyleSheet, ImageBackground, LogBox, Pressable, } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import chatBackround from '../assets/watsapp/chatBackground.png'
import ChatHeader from '../components/ChatHeader'
import Composer from '../components/Composer'
import InputBox from '../components/InputBox'
import { useStore } from './../store';
import * as firebase from 'firebase'

LogBox.ignoreLogs([' The contrast ratio of 1.5869276981034446:1 for gray.500 on #075E54']);


const ChatScreen = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const [image, setImage] = useState("");
    const [video, setVideo] = useState("");
    const [audio, setAudio] = useState("");
    const text = useStore(state => state.text);
    const { uid, displayName } = firebase.auth().currentUser;
    const { chat } = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#075E54',
                elevation: 8,
                height: 59,

            },
            headerTitle: props => <ChatHeader {...props} chat={chat} />,

        })

    }, [])


    const updateMessage = (messageId, newValues) => {
        //Here your implementation to update the state messages.
        messages.filter((item) => item.id == messageId).map((item) => {
            return { ...item, newValues }
        })
    }


    useEffect(() => {
        // Load all the messages for this chat
        const subscriber = firebase.firestore().collection('messages').
            where('chatId', '==', chat.id).
            onSnapshot((snapshot) => {
                const firestoreMessages = snapshot.docChanges().filter(({ type }) => type === "added").
                    map(({ doc }) => {
                        const message = doc.data()
                        //console.log(message && message.createdAt && message.createdAt.toDate().toLocaleTimeString())
                        return { ...message, _id: doc.id, sent: true, pending: false, createdAt: message.created.toDate() }
                    })
                setMessages(firestoreMessages)
            })

        return () => subscriber();
    }, [])

    // console.log(messages)
    const onSend = () => {
        // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        firebase.firestore().collection("messages").add({
            text: text,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            user: {
                _id: uid,
                name: displayName ? displayName : ''
            },
            chatId: chat.id,
            pending: true,
            image: image,
            video: video,
            audio: audio

        }).then()
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
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: uid,
                    }}
                    renderInputToolbar={(props) => <InputBox {...props} />}
                    alwaysShowSend={true}
                    renderComposer={(props) => (
                        <Composer {...props} />
                    )}
                    renderSend={(props) => {
                        return (
                            <Send {...props}>

                                <Box
                                    alignItems="center"
                                    justifyContent="center"
                                    bg="#128C7E"
                                    style={styles.sendButtton}

                                >
                                    <Icon type="FontAwesome"
                                        variant="solid"
                                        name="paper-plane"
                                        color="white"
                                        style={{ transform: [{ rotateZ: '410deg' }] }}
                                    />
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
        marginTop: 10,
        marginRight: 3,
        paddingRight: 5,
        height: 45,
        width: 45,
        marginLeft: 10,
        borderRadius: 30,
        borderWidth: 0.2
    }

})
