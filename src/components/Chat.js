import React, { useState } from 'react'
import { StyleSheet, Pressable } from 'react-native'
import { Avatar, Text, HStack, Box, VStack, Divider, Heading, Icon, } from 'native-base'


const Chat = ({ item }) => {
    const { name, photo, id } = item;
    const [muted, setMuted] = useState(false)
    return (

        <Box pl={4} mt={2} pt={2} pr={4}>
            <HStack space={3} alignItems="center" pb={1} mt={-5} pt={1}>
                <Avatar size="lg" source={{ uri: photo }} mt={1} />

                <VStack>
                    <Heading color="black" fontSize={18}>{name}</Heading>
                    <Text>The other fuckers will go here ......</Text>
                </VStack>
                <VStack ml="auto" alignItems='center'>
                    <Text>12.59</Text>
                    {muted && <Icon type="FontAwesome5" name="volume-mute" />}

                </VStack>
            </HStack>
            <Divider style={styles.divider} width={250} bg="lightgray" />
        </Box>

    )
}

export default Chat

const styles = StyleSheet.create({
    divider: {
        marginLeft: 77,
        borderWidth: 0.09

    }
})
