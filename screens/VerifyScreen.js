import React, { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Input, View, Text, Stack, Center, Button, Box, FormControl, VStack, Alert, } from 'native-base'
import * as firebase from 'firebase'
import { useStore } from '../store';

const VerifyScreen = ({ route, navigation }) => {
    const [verificationCode, setVerificationCode] = React.useState();
    const [message, setMessage] = React.useState({ text: '' });
    const { verificationId } = route.params;

    const phoneNumber = useStore(state => state.phoneNumber);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Verify  ${phoneNumber}`,
            headerStyle: { elevation: 0, backgroundColor: '#075E54', },
            headerTitleStyle: { color: 'white', fontSize: 18, fontFamily: 'sans-serif' },
            headerTitleAlign: 'left'
        })

    }, [navigation, phoneNumber]);

    return (
        <VStack alignItems="center">
            <Center>
                <Stack mt={5} ml={7}>

                    <Text fontSize={17} fontWeight="bold">Waiting to automatically detect an SMS sent to</Text>
                    <Text fontSize={18} fontWeight="bold">{phoneNumber}</Text>

                </Stack>

                <Input
                    w={200}
                    variant='underlined'
                    size="2xl"
                    editable={!!verificationId}
                    onChangeText={(text) => setVerificationCode(text)}
                    maxLength={6}
                    placeholder="-  -  -  -  -  -"
                    style={{ paddingLeft: 45, borderColor: '#128C7E', borderBottomWidth: 2, marginTop: 60 }}
                    focusBorderColor="#128C7E" />
                <Box mt={3}>
                    <Center>
                        <Text fontSize={18} fontWeight="bold">Enter 6-digit code</Text>
                    </Center>
                </Box>
                <Button variant='solid'
                    isDisabled={!verificationCode}
                    w={24}
                    mt={20}
                    colorScheme="green"
                    onPress={async () => {
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                verificationId,
                                verificationCode
                            );
                            await firebase.auth().signInWithCredential(credential);
                            navigation.navigate('Profile')

                        } catch (err) {

                            setMessage({ text: `Error: ${err.message}` })
                        }


                    }}

                >Next</Button>
                {message.text && <Box mx={3} mt={2}>
                    <Center>
                        <Alert status="error" variant="solid" p={1} style={{ borderRadius: 20 }}>

                            <Alert.Icon />
                            <Alert.Title alignItems="center">{message.text}</Alert.Title>

                        </Alert>
                    </Center>

                </Box>
                }
            </Center>
        </VStack>
    )
}

export default VerifyScreen

const styles = StyleSheet.create({})
