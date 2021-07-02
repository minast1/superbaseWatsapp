import React from 'react'
import { StyleSheet} from 'react-native'
import {  SimpleLineIcons} from '@expo/vector-icons';
import { IconButton ,Icon,  } from 'native-base'



const LeftIcon = (props) => {
    return (
    
        <IconButton 
          variant="unstyled"
         icon={
            <Icon as={<SimpleLineIcons name="emotsmile" />} size={5} color="darkgray" />}
        />
    )
}

export default LeftIcon

const styles = StyleSheet.create({})
