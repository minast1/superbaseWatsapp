import { Input, IconButton, Icon, HStack, } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from './../store';

const Composer = () => {
    const text = useStore(state => state.text)
    const setText = useStore(state => state.setText)

    return (
        <Input

            variant="outline"
            focusBorderColor="transparent"
            size="md"
            onChangeText={(text) => setText(text)}
            value={text}
            placeholder="Type here"
            style={{ borderRadius: 25, backgroundColor: 'white', height: 47, marginLeft: 5 }}
            w={300}
            InputLeftElement={
                <IconButton icon={
                    <Icon type="FontAwesome" name="smile-o" size={6} color="darkgray" />} />}
            InputRightElement={
                <HStack space={3} pr={2}>

                    <IconButton icon={
                        <Icon type="FontAwesome" name="paperclip" size={6} color="darkgray" />} />
                    <IconButton icon={
                        <Icon type="FontAwesome" name="camera" size={5} color="darkgray" />} />
                </HStack>
            }
        />
    )
}

export default Composer

const styles = StyleSheet.create({})
