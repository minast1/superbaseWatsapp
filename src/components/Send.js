import { Icon } from 'native-base'
import React from 'react'
import { StyleSheet, } from 'react-native'
import { Ionicons  } from '@expo/vector-icons';

const Send = ({ onSend }) => {
    return (
        <Icon as={ <Ionicons  name="ios-paper-plane-sharp" />}   
        color="white"
        size={6}
        style={{ transform: [{ rotateZ: '410deg' }] }}/>   

    )
}

export default Send

const styles = StyleSheet.create({

})
