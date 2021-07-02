
import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native'
import background from '../../assets/watsapp/background.png';
import logo from '../../assets/watsapp/logo.png';
import { StatusBar } from 'expo-status-bar';
import { VStack, Input, Text, FormControl, Button, HStack, Box } from 'native-base';
import { FontAwesome5} from '@expo/vector-icons';
import { useState } from 'react';
import { useUserStore } from '../stores/userStore';
import { supabase } from '../config/sbaseConfig';
import { registerRootComponent } from 'expo';


const WelcomeScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("minast1rith")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [isSignin, setView] = useState(true)
    

    const Login = async () => {
        setLoading(true);
        let { user, error } = await supabase.auth.signIn({
            email: email.trim(),
            password: password
        })
        if (!user) {
            setLoading(false)
            error.message?.includes("email") ? setErrors({ ...errors, email: error.message }) :
                setErrors({ ...errors, password: error.message })
        }
    }

    const Register = async () => {

        setLoading(true);
        let { user, error } = await supabase.auth.signUp({
            email: email.trim(),
            password: password
        })
        if (!user) {
            setLoading(false)
            error.message?.includes("email") ? setErrors({ ...errors, email: error.message }) :
                setErrors({ ...errors, password: error.message })
        }

    }

    return (
        <>
            <StatusBar style="light" backgroundColor="#075E54" translucent={false} />
            <View flex={1} style={{backgroundColor : '#a1a1aa'}}>
                <KeyboardAvoidingView style={styles.container} behavior="height" enabled={true} >

<ScrollView style={{ width: '100%' }} 
contentContainerStyle={{ alignItems: 'center' }}
showsVerticalScrollIndicator={false}>
      <View style={styles.circle}>
            <FontAwesome5 name="user-alt" color="black" size={50} color="white" />
        </View>
    <Box 
    bg="white"
    p={7} 
     borderRadius="lg" 
     shadow={6} 
     mt={10} 
     w="90%" 
     style={{elevation : 10}}
     alignItems="center"
     style={{position : 'relative'}}
     >
    
        <VStack space={3} alignItems="center"  w="110%">
        
        <Text fontSize="xl" pt={5} fontWeight="bold">{isSignin ? 'Sign in' : 'Sign up'}</Text>

        <FormControl isRequired isInvalid>
            <FormControl.Label _text={{color : 'black'}}>Email</FormControl.Label>
            <Input placeholder="Enter your email..."
                style={styles.email}
                 color="black"
                type="text"
                placeholderTextColor="black"
                isRequired={true}
                value={email}
                isInvalid={errors.email ? true : false}
                onChangeText={(value) => setEmail(value)}
                w="100%"
                p={2}
                variant="rounded" />
            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
            <FormControl.Label style={{ marginTop: 5 }} _text={{color : 'black'}}>Password</FormControl.Label>
            <Input placeholder="Enter your password..."
                style={styles.email}
                w="100%"
                isRequired={true}
                p={2}
                value={password}
                isInvalid={'password' in errors}
                type="password"

                onChangeText={(value) => setPassword(value)}
                variant="rounded" />

            <FormControl.ErrorMessage >{errors.password}</FormControl.ErrorMessage>

        </FormControl>
        <View style={{ overflow: 'hidden', width: "100%", alignItems : 'center'}}>
            <Button
                w="90%"

                isLoading={loading}
                bg="#14b8a6"
               variant="rounded"
                shadow={9}
                style={{ overflow: 'hidden' }}
                android_ripple={{ color: 'lightgray', borderless: true }}

                _text={{ color: 'black'}}
                onPress={() => {
                    return isSignin ? Login() : Register()
                }}

            >
                {isSignin ? 'SIGN IN' : 'SIGN UP'}
            </Button>
        </View>
        <HStack space={3} alignItems="center" >
            <Button size="xs" variant="unstyled" _text={{ color: '#60a5fa' }} onPress={() => {
                console.log('hello')
            }}

            >
                Forgot Password?
            </Button>
            {
                isSignin ? 
             <Button size="xs" colorScheme="default" variant="unstyled"
             _text={{ color: '#60a5fa' }}
             onPress={() => {setView(false)} }>
             Don't have an account? Sign Up
         </Button>
           :  <Button size="xs" colorScheme="default" variant="unstyled"
           _text={{ color: '#60a5fa' }}
           onPress={() => setView(true)}>
           Sign In
       </Button> 
            }
           
        </HStack>

    </VStack>
    </Box>
    
    
</ScrollView>
</KeyboardAvoidingView>
              
            </View>

        </>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    image: {
        flex: 1,
        //marginTop: 2,
        resizeMode: "cover",
        // justifyContent: 'center',
        alignItems: 'center'
    },
    
        container: {
           // flex: 1,
    
           // backgroundColor: '#f4f4f5',
            alignItems: 'center',
            borderColor: 'white'
        },
        email: {
            paddingLeft: 10,
            textDecorationLine: 'none',
            borderColor: 'darkgray',
            borderWidth : 1,
            
            
        },
        circle: {
            display: 'flex',
            shadowColor: "#000",
            elevation : 6,
            shadowOpacity : 1 ,
            shadowOffset : {
                width : 0,
                height : 3
            },
            shadowRadius : 4.65,
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#14b8a6",
            position :'relative',
            top : 90,
            zIndex : 10
        },
        button: {
            borderRadius: 50
        },
        main : {
            backgroundColor : 'white'
        }
    
})
