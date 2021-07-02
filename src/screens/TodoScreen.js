import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, IconButton, Checkbox, Text, VStack, HStack, Heading, Icon, Center, } from 'native-base';
import { supabase } from '../config/sbaseConfig';
import { useUserStore } from '../stores/userStore';
import { useEffect } from 'react';
import { useState } from 'react';
//import 'react-native-url-polyfill/auto'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


//import { useUserStore } from '../stores/userStore';


const TodoScreen = () => {
    const [todo, setTodo] = useState(null)
    const [inputValue, setInputValue] = React.useState("");
    let { id } = supabase.auth.user()
    //console.log(id)
    const getUserData = async () => {
        const { data } = await supabase
            .from('todos')
            .select('*')
            .filter('user_id', 'eq', id)
        // if (error) throw error
        setTodo(data)

    }

    useEffect(() => {
        getUserData()
        const mySubscription = supabase
            .from('todos')
            .on('*', () => getUserData())
            .subscribe()
        return () => supabase.removeSubscription(mySubscription)
    }, [])

    const addItem = async () => {
        const { data, error } = await supabase
            .from('todos')
            .insert([
                { item: inputValue, user_id: id },
            ])
        if (error) {
            console.log(error)
        }
    }
    const handleStatusChange = async (id, status) => {
        //first get the current status of the item and change it accordingly

        const { data, error } = await supabase
        .from('todos')
        .update({ completed: !status }, {returning : 'minimal'})
        .eq('id', id)
        if(error) {
            console.log(error)
        }
    };

    const handleDelete = async(id) => {
        const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
         if(error) {
             console.log(error)
         }
    
      };
    //  console.log(todo)
    return (
        <Center flex={1}>
            <VStack space={4} flex={1} w="90%" mt={4}>
                <Heading color="emerald.400">Todo pp</Heading>
                <Input
                    variant="filled"
                    w="100%"
                    InputRightElement={
                        <Button
                            colorScheme="emerald"
                            ml={1}
                            onPress={() => {
                                addItem();
                                setInputValue("");
                            }}
                        >
                            <Icon as={MaterialIcons} name="add-task" color="black" />
                        </Button>
                    }
                    onChangeText={(v) => setInputValue(v)}
                    value={inputValue}
                    placeholder="Add Item"
                />
                <VStack>
                    {todo?.map((item) => (
                        <HStack
                            w="100%"
                            justifyContent="space-between"
                            alignItems="center"
                            key={item.item + item.id.toString()}
                        >
                            <Checkbox
                                colorScheme="emerald"
                                isChecked={item.completed}
                                accessibilityLabel="This is a dummy checkbox"
                                onChange={() => handleStatusChange(item.id, item.completed)}
                                value={item.title}
                            >
                                <Text mx={2} strikeThrough={item.completed}>
                                    {item.item}
                                </Text>
                            </Checkbox>
                            <IconButton
                                colorScheme="emerald"
                                icon={<Icon as={FontAwesome5} name="trash" size="sm" style={styles.delete}/>}
                                onPress={() => handleDelete(item.id)}
                            />
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </Center>
    )
}

export default TodoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    delete : {
        color : 'red'
    }
})
