import React from 'react';
import { API_CHECK_AUTH, API_URL } from 'react-native-dotenv'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios, { Axios } from 'axios';
import LoginForm from './src/components/loginForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSuccess from './src/screens/loginSuccess';
// view components
import ServicesLocation from './src/views/ServicesLocation';
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

const Stack = createNativeStackNavigator();

export default function App() {
  const [authorized, SetAuthorized] = React.useState(false);
  const [firstLaunch, setFirstLaunch] = React.useState(true);
  const handleLogout = () => SetAuthorized(false);

  React.useEffect(async () => {
    SetAuthorized(Boolean(await AsyncStorage.getItem('@authorized')));
    const isntFirstLaunch = Boolean(await AsyncStorage.getItem('@nextLaunch'));
    isntFirstLaunch ? setFirstLaunch(false) : setFirstLaunch(true);
  }, [])
  // React.useEffect(() => {
  //   console.log(navigationRef.current.getCurrentRoute().name);
  //   setRoute(navigationRef.current.getCurrentRoute().name);
  // })
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
