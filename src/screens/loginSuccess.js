import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { Button, Text, View } from 'react-native'

const LoginSuccess = () => {
    const [username, setUsername] = React.useState('');
    React.useEffect(async () => {
        setUsername(await AsyncStorage.getItem('@username'))
    }, [])
    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Login success✅{username}</Text>
            <Button title='Logout' />
        </View>
    )
}

export default LoginSuccess;