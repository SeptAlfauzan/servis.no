import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
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
        <ScrollView
            bounces={true}
            // alwaysBounceHorizontal={true}
            contentContainerStyle={tw`items-center flex relative px-8 py-14`}
            style={tw`mb-20 w-full `}
        >
            {[1, 2].map(data => (
                <>

                    <View style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}>
                        <View>
                            <Text style={tw`text-slate-500`}>2022-05-11</Text>
                            <Text style={tw`font-bold mt-2`}>Nama tempat servis</Text>
                            <Text style={tw`text-slate-600`}>Servis laptop</Text>
                            <Text style={tw`text-green-600 font-bold`}>Order selesai</Text>
                        </View>
                        <View
                            style={tw`bg-green-300 rounded-full w-13 h-13`}
                        >

                            <Image
                                resizeMode='contain'
                                style={tw`w-14 h-14 self-center -left-2 top-3`}
                                source={require('./../../assets/illustrations/icons/repairing.png')}
                            />
                        </View>
                    </View>
                    <View style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}>
                        <View>
                            <Text style={tw`text-slate-500`}>2022-05-11</Text>
                            <Text style={tw`font-bold mt-2`}>Nama tempat servis</Text>
                            <Text style={tw`text-slate-600`}>Servis laptop</Text>
                            <Text style={tw`text-yellow-600 font-bold`}>Dalam pengerjaan</Text>
                        </View>
                        <View
                            style={tw`bg-yellow-200 rounded-full w-13 h-13`}
                        >

                            <Image
                                resizeMode='contain'
                                style={tw`w-14 h-14 self-center -left-2 top-3`}
                                source={require('./../../assets/illustrations/icons/repairing.png')}
                            />
                        </View>
                    </View>
                    <View style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}>
                        <View>
                            <Text style={tw`text-slate-500`}>2022-05-11</Text>
                            <Text style={tw`font-bold mt-2`}>Nama tempat servis</Text>
                            <Text style={tw`text-slate-600`}>Servis laptop</Text>
                            <Text style={tw`text-blue-600 font-bold`}>Order diterima mitra</Text>
                        </View>
                        <View
                            style={tw`bg-blue-200 rounded-full w-13 h-13`}
                        >

                            <Image
                                resizeMode='contain'
                                style={tw`w-14 h-14 self-center -left-2 top-3`}
                                source={require('./../../assets/illustrations/icons/repairing.png')}
                            />
                        </View>
                    </View>
                    <View style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}>
                        <View>
                            <Text style={tw`text-slate-500`}>2022-05-11</Text>
                            <Text style={tw`font-bold mt-2`}>Nama tempat servis</Text>
                            <Text style={tw`text-slate-600`}>Servis laptop</Text>
                            <Text style={tw`text-red-600 font-bold`}>Order belum dibayar</Text>
                        </View>
                        <View
                            style={tw`bg-red-200 rounded-full w-13 h-13`}
                        >

                            <Image
                                resizeMode='contain'
                                style={tw`w-14 h-14 self-center -left-2 top-3`}
                                source={require('./../../assets/illustrations/icons/repairing.png')}
                            />
                        </View>
                    </View>
                    <View style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}>
                        <View>
                            <Text style={tw`text-slate-500`}>2022-05-11</Text>
                            <Text style={tw`font-bold mt-2`}>Nama tempat servis</Text>
                            <Text style={tw`text-slate-600`}>Servis laptop</Text>
                            <Text style={tw`text-red-600 font-bold`}>Order dibatalkan</Text>
                        </View>
                        <View
                            style={tw`bg-red-200 rounded-full w-13 h-13`}
                        >

                            <Image
                                resizeMode='contain'
                                style={tw`w-14 h-14 self-center -left-2 top-3`}
                                source={require('./../../assets/illustrations/icons/cancel.png')}
                            />
                        </View>
                    </View>
                </>
            ))}

        </ScrollView>

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
