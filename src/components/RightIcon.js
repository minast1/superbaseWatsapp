import { Icon, HStack } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {  SimpleLineIcons, FontAwesome5} from '@expo/vector-icons';


const RightIcon = () => {
    return ( 
        <HStack space={4} pr={2}>
        <Icon as={<SimpleLineIcons name="paper-clip" />} size={6} color="darkgray" />
         <Icon as={<FontAwesome5 name="camera" />} size={5} color="darkgray" /> 
          </HStack>
    )
}

export default RightIcon

const styles = StyleSheet.create({})
