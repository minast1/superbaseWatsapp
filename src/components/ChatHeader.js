import React from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { HStack, Avatar, VStack, Icon, Button, Text , Box} from 'native-base';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';



const ChatHeader = ({ chat }) => {
    const screen = Dimensions.get("window");
    const { name, photo } = chat
    return (
        <HStack alignItems="center">
            <HStack space={1} alignItems="center" ml={-8}>
            <Avatar  source={{ uri: photo }} />
            <VStack >
            <Text color="white" fontSize={20}>{name}</Text>
            <Text color="white" fontSize={14}>online</Text>
            </VStack>
            
            
            </HStack >
          
              
            <HStack alignItems="center" ml={10} >
                <Button variant="unstyled">
                    <Icon as={<FontAwesome5 name="video" />} color="white"  size={5}/>
                </Button>
                <Button variant="unstyled">
                <Icon as={<FontAwesome5 name="phone-alt"/>} color="white"  size={4}/>
                </Button>
                <Button variant="unstyled">
                <Icon as={<Ionicons name="ellipsis-vertical"/>} color="white"  size={5} />
                </Button>
            </HStack>
        </HStack>
    )
}

export default ChatHeader

const styles = StyleSheet.create({
    header : {

    }
})
