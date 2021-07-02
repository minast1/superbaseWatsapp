import { FontAwesome , SimpleLineIcons ,FontAwesome5} from '@expo/vector-icons';
import { Input, IconButton, Icon, HStack, Box} from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from '../stores/userStore';
import { Composer } from 'react-native-gifted-chat';
import LeftIcon from './LeftIcon';
import RightIcon from './RightIcon';




const Customcomposer = (props) => {

    const text = useStore(state => state.text)
    const setText = useStore(state => state.setText)

    return (
        <HStack w="83%" ml={1} bg="white" borderRadius="full" h="94%" alignItems="center">
          <Input
          p={1}
          InputLeftElement={
            <LeftIcon/>
          }
        onChangeText={(text) => useStore.setState({text : text})}
        value={text}
           
         type="text"
          w="95%"
           variant="unstyled"
          placeholder="Type a message...."
          InputRightElement={
            <HStack  space={4}>
            <Icon as={<SimpleLineIcons name="paper-clip" />} size={6} color="darkgray" />
             <Icon as={<FontAwesome5 name="camera" />} size={5} color="darkgray" /> 
              </HStack>
          }
        />
         
      </HStack>
    )
}

export default Customcomposer

const styles = StyleSheet.create({
    focus : {
        borderColor : 'transparent'
    }
})
