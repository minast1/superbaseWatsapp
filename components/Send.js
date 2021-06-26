import { Icon } from 'native-base'
import React from 'react'
import { StyleSheet, } from 'react-native'

const Send = ({ onSend }) => {
    return (

        <Icon type="FontAwesome"
            variant="solid"
            name="paper-plane"
            color="white"
            style={{ transform: [{ rotateZ: '410deg' }] }}
        />

    )
}

export default Send

const styles = StyleSheet.create({

})
