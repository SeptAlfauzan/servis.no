import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from '../components/Navbar';
import { AntDesign } from '@expo/vector-icons';
import HistoryOrderScreen from './HistoryOrder';

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
                style={tw`absolute z-100 bottom-0 h-3/4 w-full bg-white rounded-t-15 self-center py-14 px-8 flex-row`}
            >
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        style={tw`bg-slate-300 rounded-lg w-20 h-20 flex justify-center items-center m-2 p-2`}
                        onPress={() => navigation.navigate('Map')
                        }>
                        <Image
                            resizeMode='contain'
                            style={tw`w-12 h-12 self-center`}
                            source={require('./../../assets/illustrations/icons/order-now.png')}
                        />
                    </TouchableOpacity>
                    <Text style={tw`text-xs`}>make order</Text>
                </View>
                <View style={tw`flex items-center`}>
                    <TouchableOpacity
                        style={tw`bg-slate-300 rounded-lg w-20 h-20 flex justify-center items-center m-2 p-2`}
                        onPress={() => navigation.navigate('ProcessOrder')
                        }>
                        <Image
                            resizeMode='contain'
                            style={tw`w-12 h-12 self-center`}
                            source={require('./../../assets/illustrations/icons/note.png')}
                        />
                    </TouchableOpacity>
                    <Text style={tw`text-xs`}>Process orders</Text>
                </View>
            </View>
        </View >

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
            <Tab.Screen name="History" component={HistoryOrderScreen} />
        </Tab.Navigator>
    );
}
