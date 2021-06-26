import { Box, Text, Heading, Image, VStack, Stack, Button, Center, useTheme, useToken } from 'native-base'
import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native';
import background from '../assets/watsapp/background.png';
import logo from '../assets/watsapp/logo.png';
import { StatusBar } from 'expo-status-bar';


const WelcomeScreen = ({ navigation }) => {


    return (
        <>
            <StatusBar style="light" backgroundColor="#075E54" translucent={false} />
            <View flex={1}>
                <ImageBackground source={background} style={styles.image}>
                    <VStack flex={1} justifyContent="center">
                        <Center>
                            <Image alt="watsapp" source={logo} size={100} />
                            <Heading mt={5}>Welcome to WhatsApp</Heading>
                        </Center>

                    </VStack>


                    <Box alignItems="center" p={10}>
                        <Text color="white">
                            Tap "Agree and continue" to accept the <Text bold color="#128C7E"> Watsapp Terms of Service and Privacy Policy
                           </Text>
                        </Text>
                    </Box>
                </ImageBackground>
                <VStack>
                    <Box bg="#25D366" height={3} />
                    <Box bg="#737373" alignItems="center" style={{ paddingVertical: 6 }}>

                        <Button size="md"
                            colorScheme='coolGray'
                            _text={{ color: 'white' }}
                            variant="solid"
                            style={styles.button}
                            shadow={8}
                            onPress={() => navigation.navigate('Register')}
                        >Agreand continue

                        </Button>

                    </Box>
                </VStack>
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
    button: {
        width: "80%",
        elevation: 10,
        paddingHorizontal: 3,
        paddingVertical: 2,





    }
})
