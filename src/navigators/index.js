import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Auth from './AuthStack'
import MainStack from './MainStack';
import { supabase } from '../config/sbaseConfig'


export default () => {
    const [user, setUser] = useState(null)


    useEffect(() => {
        const session = supabase.auth.session()

        setUser(session?.user ?? null)

        const { data: authListner } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                // console.log(event, session)
                // setSession(session);
                setUser(session?.user ?? null)
            }
        )
        return () => {
            authListner?.unsubscribe()
        }

    }, [user])
    //console.log(authSession)

    return (
        <NavigationContainer>

            {user ?
                <MainStack /> : <Auth />}

        </NavigationContainer>

    )
}


