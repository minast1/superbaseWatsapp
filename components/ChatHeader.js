import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { HStack, Avatar, Heading, Icon, Button } from 'native-base';

const ChatHeader = ({ chat }) => {
    const { name, photo } = chat
    return (
        <HStack space={2} alignItems="center" flex={1} ml={-8}>
            <Avatar size="md" source={{ uri: photo }} />
            <Heading>{name}</Heading>

            <HStack ml="auto" space={1} alignItems="center">
                <Button variant="unstyled">
                    <Icon name="video" type="FontAwesome5" color="white" size={4} />
                </Button>
                <Button variant="unstyled">
                    <Icon name="phone-alt" type="FontAwesome5" color="white" size={4} />
                </Button>
                <Button variant="unstyled">
                    <Icon name="ellipsis-vertical" type="Ionicons" color="white" />
                </Button>
            </HStack>
        </HStack>
    )
}

export default ChatHeader

const styles = StyleSheet.create({})
