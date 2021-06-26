import { Avatar, Box, Button, Center, Input, Stack, Text, VStack } from 'native-base'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, LogBox, } from 'react-native'
import avatar from '../assets/watsapp/avatar.png'
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase'
import { useStore } from './../store';


LogBox.ignoreLogs(['Setting a timer for a long period of time']);
const ProfileScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [userName, setUserName] = useState('')
    const { phoneNumber, uid } = firebase.auth().currentUser;
    // const token = useStore(state => state.idToken)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Profile info',
            headerStyle: {
                backgroundColor: '#075E54',
                elevation: 0
            },
            headerTitleStyle: { color: 'white', fontSize: 18, fontFamily: 'sans-serif' },
            headerTitleAlign: 'center'
        })

    }, [navigation]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        })

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <VStack px={5} flex={1}>
                <Center mt={3}>
                    <Stack>
                        <Text fontSize={16} fontWeight="bold">Please provide your name and an optional </Text>
                        <Text fontSize={16} fontWeight="bold" alignSelf="center">profile photo</Text>

                    </Stack>
                    <Box mt={4}>
                        <Button
                            variant="unstyled"
                            onPress={pickImage}
                            startIcon={<Avatar source={image ? { uri: image } : avatar} size={150} />} />

                    </Box>
                    <Box pt={3}>
                        <Input
                            w={270}
                            variant='underlined'
                            size="lg"
                            placeholder="Type your name here"
                            focusBorderColor="#128C7E"
                            value={userName}
                            onChangeText={(text) => setUserName(text)}
                            style={{ borderColor: '#128C7E', borderBottomWidth: 2 }} />
                    </Box>

                    <Button variant='solid'
                        w={24}
                        mt={20}
                        colorScheme="green"
                        onPress={() => {
                            //Save user as a chat in the database;
                            const dbh = firebase.firestore();
                            dbh.collection('users').doc(uid).set({
                                displayName: userName && userName,
                                photoURL: image && image,
                                phone: phoneNumber,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp()
                            }).then(() => useStore.setState({ hasProfile: true })).catch((error) => {
                                console.log(error)
                            })

                            // navigation.navigate('Home')
                        }}
                    >Next</Button>

                </Center>

            </VStack>

        </ScrollView >


    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    image: {
        borderRadius: 20,
        borderWidth: 1,
        width: 170,
        height: 170
    }
})
