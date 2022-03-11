import React from 'react';
import { API_CHECK_AUTH, API_URL } from 'react-native-dotenv'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios, { Axios } from 'axios';
import LoginForm from './src/components/loginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSuccess from './src/screens/loginSuccess';
import ServicesLocation from './src/views/ServicesLocation';
import Map from './src/views/Map';
import SwipeUpDrawer from './src/components/swipeupDrawer';

const Stack = createNativeStackNavigator();

export default function App() {
  const [authorized, SetAuthorized] = React.useState(false);
  const handleLogout = () => SetAuthorized(false);
  React.useEffect(async () => {
    SetAuthorized(Boolean(await AsyncStorage.getItem('@authorized')));
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        {authorized ? (
          <Stack.Screen name='LoginSucces' component={LoginSuccess} />
        ) : (
          <>
            <Stack.Screen name='Home' component={Map} />
            <Stack.Screen name='LoginSucces' component={LoginSuccess} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Home = ({ navigation }) => {
  // const [authorized, setAuthorized] = React.useState(false);
  const getData = async () => {
    console.log(API_CHECK_AUTH)
    try {
      const token = await AsyncStorage.getItem('@token');
      const data = await axios.get(API_CHECK_AUTH, {
        headers: {
          'authorization': token
        }
      });
      // console.log(data.data)
      navigation.navigate('LoginSucces');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Get Repair, let us repair your gadget 📱</Text>
      <LoginForm />
      <Button title='test API' onPress={getData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
