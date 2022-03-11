import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_LOGIN, API_GET_TOKEN } from 'react-native-dotenv';

class Auth {
    static login = async (username, password) => {
        const requestLogin = await axios.post(API_LOGIN, {
            username,
            password
        })
        const requestToken = await axios.get(API_GET_TOKEN)
        const { token, auth } = requestToken.data;
        console.log(requestToken.data);
        // PLEASE REPLACE THIS WHEN THE AUTH API IS READY
        console.log('token saved! ✅');
        AsyncStorage.setItem('@token', token);
        AsyncStorage.setItem('@authorized', auth ? 'true' : '');
        AsyncStorage.setItem('@username', requestToken.data.username);
        // AsyncStorage.setItem('@auth', token)
    }
}

module.exports = Auth;