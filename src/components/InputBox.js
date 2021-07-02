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
              //  borderColor : 'transparent'
               // borderRadius: 30,
               // marginLeft : 4,
                marginBottom: 4,
               borderTopColor : 'transparent',
               // display: 'flex',
               justifyContent: 'center',
                // paddi: 2,
               // display : 'none'
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
