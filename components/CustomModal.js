import { Center, Modal, Text } from 'native-base'
import React from 'react'
import { StyleSheet, } from 'react-native'
import { FirebaseRecaptchaVerifier } from 'expo-firebase-recaptcha';
import { useStore } from './../store';
import firebase from '../fireConfig';

const CustomModal = ({ phoneNumber }) => {
    const modalVisible = useStore(state => state.modalVisible)
    const [recaptchaToken, setRecaptchaToken] = React.useState('');

    const onPressSendVerificationCode = async () => {
        // Create an application verifier from the reCAPTCHA token
        if (!recaptchaToken) return;
        const applicationVerifier = new FirebaseRecaptchaVerifier(recaptchaToken);
        // useStore(state => state.setApplicationVerifier(applicationVerifier));

        // Start phone autenthication
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            applicationVerifier
        );
        useStore(state => state.setVerificationId(verificationId))

        verificationId && useStore(state => state.setModalVisible)

    }

    return (
        <Center flex={1}>
            <Modal
                isOpen={modalVisible}
                overlayVisible={true}
            >
                <Modal.Content>
                    <Text>Recaptcha widget goes here</Text>

                </Modal.Content>
            </Modal>
        </Center>
    )
}

export default CustomModal

const styles = StyleSheet.create({})
