import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from '../components/Navbar';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    return (
        <View
            style={tw`flex h-full w-full relative relative bg-blue-200 py-10 px-3`}
        >

            <Image
                resizeMode='contain'
                style={tw`absolute -top-40 w-full h-full self-center`}
                source={require('./../../assets/illustrations/welcome.png')}
            />
            <Text
                style={tw`text-xl text-white`}
            >
                Selamat datang user
            </Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('AccountProfile')}
                style={tw`absolute right-3 top-10 rounded-full border w-10 h-10 flex items-center justify-center bg-slate-300`}
            >
                <AntDesign name="user" size={24} color="black" />
            </TouchableOpacity>

            <View
                style={tw`absolute z-100 bottom-0 h-3/4 w-full bg-white rounded-t-15 self-center`}
            >
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <Text>make order</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}
const SettingsScreen = () => {
    return (
        <View
            style={tw`flex h-full w-full relative justify-center items-center`}
        >
            <Text>Setting</Text>

        </View>

    );
}
const Tab = createBottomTabNavigator();

export default function HomeDashboard({ navigation }) {

    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => <Navbar {...props} />}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
