import React from 'react'
import { StyleSheet } from 'react-native'
import { FormControl, Input, Icon, Stack, Text, Box, VStack, Button, Factory, Modal, HStack, Center, Alert, CloseButton } from 'native-base';

import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase'
import { useStore } from '../store';
import Error from '../components/Error'



const LoginScreen = ({ navigation }) => {
    const recaptchaVerifier = React.useRef();
    const [verificationId, setVerificationId] = React.useState();
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [message, setMessage] = React.useState({ text: '' });

    const getErrorMessage = () => {
        if (phoneNumber !== 0 && phoneNumber.toString().length != 9) {
            return "Nine digits expected, Please check number"
        }
        if (phoneNumber === 0) {
            return "This fild is required!"
        }
    }

    const FireNativeModal = Factory(FirebaseRecaptchaVerifierModal);

    return (
        <>

            <Modal
                size="xl"
                isOpen={modalVisible}
                onClose={setModalVisible}
                overlayVisible={true}
            >
                <Modal.Content>

                    <Modal.Body>
                        <Stack>
                            <Text fontSize={18}> We will be verifying the phone</Text>
                            <Text fontSize={18}> number:</Text>
                            <Text fontSize={18} mt={2}>{`+233  ${phoneNumber} `}</Text>
                            <Text fontSize={18}> is this ok, or would you like to edit the number ?</Text>
                        </Stack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            mr="auto"
                            variant="unstyled"
                            _text={{ color: '#128C7E', fontWeight: 'bold' }}
                            onPress={() => setModalVisible(!modalVisible)}>
                            Edit
                          </Button>
                        <Button
                            variant="unstyled"
                            _text={{ color: '#128C7E', fontWeight: 'bold' }}
                            onPress={async () => {

                                try {
                                    const formattedNumber = `+233${phoneNumber}`;
                                    useStore.setState({ phoneNumber: formattedNumber })
                                    // useStore(state => state.setPhoneNumber(formattedNumber))
                                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                                    const verificationId = await phoneProvider.verifyPhoneNumber(
                                        formattedNumber,
                                        recaptchaVerifier.current
                                    );
                                    setVerificationId(verificationId);



                                } catch (err) {
                                    //An error occured 
                                    setModalVisible(!modalVisible)
                                    setMessage({ text: `Error: ${err.message}` })
                                }

                                setModalVisible(!modalVisible)
                            }
                            }>
                            Ok
                         </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <FireNativeModal
                p={20}
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={false} />

            <VStack flex={1} pt={4}>

                <Stack alignItems="center">
                    <Box alignItems="center">
                        <Text fontSize={15} fontWeight="bold">WhatsApp will send an SMS message (carrier </Text>
                        <Text fontSize={15} fontWeight="bold"> charges may apply) to verify your phone number.</Text>
                        <Text fontSize={16} fontWeight="bold">Enter your country code and phone number</Text>

                    </Box>


                </Stack>

                <FormControl isRequired mt={5} mb={15} isInvalid>
                    <Stack mx={8}>
                        <Input p={2}
                            mt={2}
                            isReadOnly={true}
                            w="90%"
                            size="md"
                            fontSize={18}
                            value={"Ghana"}
                            focusBorderColor="#128C7E"
                            style={{ borderColor: '#128C7E', paddingLeft: 100, borderBottomWidth: 2, }}
                            variant="underlined" placeholder="Display Name" />

                        <Input p={2}
                            w="90%"
                            variant="underlined"
                            size="md"
                            fontSize={18}
                            letterSpacing="wider"
                            keyboardType="numeric"
                            style={{ borderColor: '#128C7E', borderBottomWidth: 2 }}
                            focusBorderColor="#128C7E"
                            onChangeText={(text) => setPhoneNumber(text)}
                            value={phoneNumber}
                            placeholder='Phone Number'
                            isInvalid={phoneNumber == 0 ? true : false}
                            InputLeftElement={
                                <Box px={2} py={3} style={{ borderRightWidth: 0 }}>
                                    <Text fontSize="lg">+233</Text>
                                </Box>
                            }
                        />

                        <Error message={getErrorMessage()} />

                    </Stack>
                </FormControl>

                {verificationId && <Box alignItems="center" mx={3}>
                    <Center>
                        <Alert status="success" variant="solid" p={1} style={{ borderRadius: 20 }}>

                            <Alert.Icon />
                            <Alert.Title alignItems="center">{`Verification code has been sent to +233 ${phoneNumber} `}</Alert.Title>

                        </Alert>
                    </Center>
                </Box>
                }

                <Center mt={5}>
                    {
                        verificationId ?
                            <Button
                                onPress={() => navigation.navigate('Verify', {
                                    verificationId: verificationId,

                                })}
                                variant="solid"
                                colorScheme="green"
                            >Next</Button>
                            :
                            <Button
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setMessage({ text: '' })
                                }}
                                isDisabled={phoneNumber.length == 9 ? false : true}
                                variant="solid"
                                colorScheme="green"
                            >Verify</Button>
                    }

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

            </VStack >

        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center'
    }
})
