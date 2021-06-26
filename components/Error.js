import { FormControl } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Error = ({ message }) => {
    //console.log(message)
    return (
        <FormControl.ErrorMessage mt={2}>
            {message}
        </FormControl.ErrorMessage>
    )
}

export default Error

const styles = StyleSheet.create({})
