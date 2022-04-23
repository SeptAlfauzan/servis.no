import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from '../components/Navbar';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from 'react-native-dotenv';

export default function HistoryOrderScreen({ navigation }) {
    const [data, setData] = React.useState(null);
    const [trigger, setTrigger] = React.useState(false);

    const isFocussed = useIsFocused();
    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log('test');
    //         setTrigger(true);
    //     }, [])
    // );
    React.useEffect(() => {

        navigation.addListener('focus',
            async () => {

                try {
                    console.log('asdsd')
                    const getusername = await AsyncStorage.getItem('@username');
                    const token = await AsyncStorage.getItem('@access-token');

                    const responseUser = await axios.get(`${API_URL}api/users/user/${getusername}`,
                        {
                            headers: {
                                'authorization': token
                            }
                        }
                    );
                    const { user } = responseUser.data;
                    const response = await axios.get(`https://servisno.herokuapp.com/api/orders/history/${user.id}`);

                    console.log('user', response.data.data)
                    setData(response.data.data);
                } catch (error) {
                    console.log(error.message)
                }
            }
        )
    }, [data])

    return (
        <ScrollView
            bounces={true}
            // alwaysBounceHorizontal={true}
            contentContainerStyle={tw`items-center flex relative px-8 py-14`}
            style={tw`mb-20 w-full `}
        >
            {!data && (
                <ActivityIndicator size="large" color="#ffffff" />
            )}
            {data && Array.from(data).map(d => {
                let color = '';
                if (d.canceled == true || d.order_status_id == 1) {
                    color = 'red';
                } else {
                    color = 'green';
                }
                return (
                    <TouchableOpacity
                        key={d.id}
                        onPress={() => navigation.navigate('DetailOrder', d)}
                        style={tw`px-5 w-full py-3 border border-slate-300 rounded-lg  mb-2`}
                    >
                        <View
                            key={d.id}
                            style={tw`flex-row justify-between`}
                        >
                            <View

                            >
                                <Text style={tw`text-slate-500`}>{d.createdAt}</Text>
                                <Text style={tw`font-bold mt-2`}>{
                                    d.patner ? d.patner.name : null
                                }</Text>
                                <Text style={tw`text-slate-600`}>Servis {d.gadget}</Text>
                                <Text style={tw`text-slate-600`}>Keluhan</Text>
                                <Text style={tw`text-slate-600`}>{d.complaint}</Text>
                            </View>
                            <View
                                style={tw`bg-${color}-200 rounded-full w-13 h-13`}
                            >

                                <Image
                                    resizeMode='contain'
                                    style={tw`w-14 h-14 self-center -left-2 top-3`}
                                    source={require('./../../assets/illustrations/icons/repairing.png')}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row w-full justify-between`}>
                            <Text style={tw`text-${color}-600 font-bold mt-3`}>
                                {d.canceled ? 'Pesanan dibatalkan' : d.order_status.name}</Text>
                            <Text style={tw`text-slate-300 text-xs font-300 mt-3`}>Tap untuk detail</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}

            {/* <View style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}>
                <View>
                    <Text style={tw`text-slate-500`}>2022-05-11</Text>
                    <Text style={tw`font-bold mt-2`}>{String(trigger)}</Text>
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
            </View> */}

        </ScrollView>

    );
}