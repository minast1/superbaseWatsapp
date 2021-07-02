import { createClient } from '@supabase/supabase-js'
import { SUPERBASE_KEY, SUPERBASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const supabase = createClient('https://mhmvwjvnkelzrpudlujz.supabase.co', SUPERBASE_KEY, {
    localStorage: AsyncStorage,
})