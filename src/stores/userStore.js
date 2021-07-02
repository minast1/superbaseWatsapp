
import create from 'zustand'
import { supabase } from '../config/sbaseConfig'
import * as SecureStore from 'expo-secure-store';




export const useStore = create((set, get) => ({
    switchAuth: false,
    avatar_url: '',
    username: '',
    session: null,
    text : '',
    lLoading: false,
    rLoading: false,

}))