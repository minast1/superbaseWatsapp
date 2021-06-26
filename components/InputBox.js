import { Box, HStack, Input } from 'native-base'

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { InputToolbar } from 'react-native-gifted-chat'


const InputBox = (props) => {

    return (

        <InputToolbar
            {...props}

            containerStyle={{
                backgroundColor: 'transparent',
                borderRadius: 30,
                borderTopWidth: 0,
                // marginHorizontal: 5,
                marginBottom: 4,

                // height: 47,
                display: 'flex',
                justifyContent: 'center',
                //  paddingBottom: 2,

                //  width: 295

            }} />



    )
}

export default InputBox

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.3,
        backgroundColor: 'white',

    }
})
