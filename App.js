import React from 'react';
import { API_CHECK_AUTH, API_URL } from 'react-native-dotenv'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios, { Axios } from 'axios';
import LoginForm from './src/components/loginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
// view components
import Map from './src/views/Map';
import Login from './src/views/Login';
import HomeDashboard from './src/views/Home';
import Onboard from './src/views/Onboard';
import Register from './src/views/Register';
import Verification from './src/views/Verification';
import SuccessScreen from './src/views/SuccessScreen';
import PushNotif from './src/views/PushNotif';
import AccountProfile from './src/views/AccountProfile';
import EditAccount from './src/views/EditAccount';
import RegisterPatner from './src/views/RegisterPatner';
import SelectLocation from './src/views/SelectLocation';
import ScanQR from './src/views/ScanQR';
import MakeOrder from './src/views/MakeOrder';
import ProcessOrder from './src/views/ProcessOrder';
import SetTransaction from './src/views/SetTransaction';
import ConfirmOrder from './src/views/Orders/Confirm';

import PushNotification from './src/utils/PushNotification';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [authorized, SetAuthorized] = React.useState(false);
  const [firstLaunch, setFirstLaunch] = React.useState(true);
  const handleLogout = () => SetAuthorized(false);

  React.useEffect(async () => {
    SetAuthorized(Boolean(await AsyncStorage.getItem('@authorized')));
    const isntFirstLaunch = Boolean(await AsyncStorage.getItem('@nextLaunch'));
    isntFirstLaunch ? setFirstLaunch(false) : setFirstLaunch(true);

    //set up for notification listener
    const token = await PushNotification.registerForPushNotificationsAsync();
    Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response', response);
    });

    AsyncStorage.setItem('@notif-token', token);


    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };


  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboard' screenOptions={{ headerShown: false }}>
        {authorized ? (
          <Stack.Screen name='Dashboard' component={HomeDashboard} />
        ) : (
          <>
            <Stack.Screen name='Onboard' component={firstLaunch ? Onboard : Login} />
            <Stack.Screen name='Dashboard' component={HomeDashboard} />
          </>
        )}
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SuccessScreen' component={SuccessScreen} />
        <Stack.Screen name='Verification' component={Verification} />
        <Stack.Screen name='Map' component={Map} />
        <Stack.Screen name='PushNotif' component={PushNotif} />
        <Stack.Screen name='AccountProfile' component={AccountProfile} />
        <Stack.Screen name='EditAccount' component={EditAccount} />
        <Stack.Screen name='RegisterPatner' component={RegisterPatner} />
        <Stack.Screen name='SelectLocation' component={SelectLocation} />
        <Stack.Screen name='ScanQR' component={ScanQR} />
        <Stack.Screen name='MakeOrder' component={MakeOrder} />
        <Stack.Screen name='ProcessOrder' component={ProcessOrder} />
        <Stack.Screen name='SetTransaction' component={SetTransaction} />

        <Stack.Screen name='ConfirmOrder' component={ConfirmOrder} />
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
