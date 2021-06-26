import create from 'zustand'
import { persist } from "zustand/middleware"
import * as SecureStore from 'expo-secure-store';


export const useStore = create((set, get) => ({
    phoneNumber: '',
    authUser: null,
    hasProfile: false,
    text: '',
    setText: (text) => set({ text: text })

}))

