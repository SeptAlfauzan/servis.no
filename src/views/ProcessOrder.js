import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from '../components/Navbar';
import { AntDesign } from '@expo/vector-icons';
import HeaderNav from '../components/HeaderNav';
import ModalProcessOrder from '../ModalProcessOrder';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from 'react-native-dotenv';

export default function ProcessOrder({ navigation }) {
    const [data, setData] = React.useState(null);
    const modal = React.useRef(null);


    React.useEffect(async () => {
        try {
            const getusername = await AsyncStorage.getItem('@username');
            const token = await AsyncStorage.getItem('@access-token');

            const responseGetPatner = await axios.get(`${API_URL}api/patners/patner/${getusername}`,
                {
                    headers: {
                        'authorization': token
                    }
                }
            );

            const { patner } = responseGetPatner.data;

            console.log(patner)


            const responseGetOrders = await axios.get(`https://servisno.herokuapp.com/api/orders/need-proceed/${patner.id}`);
            setData(responseGetOrders.data.data)
            console.log(responseGetOrders.data.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <>
            <ModalProcessOrder ref={modal} />
            <HeaderNav title="Process Order" navigation={navigation} />
            <ScrollView
                bounces={true}
                // alwaysBounceHorizontal={true}
                contentContainerStyle={tw`items-center flex relative px-8 py-14`}
                style={tw`w-full `}
            >
                {(data && data.length == 0) && (
                    <Text>No Order</Text>
                )}
                {data === null && (
                    <ActivityIndicator size="large" color="#ffffff" />
                )}
                {data && data.map(d => {
                    let color;

                    if (d.progress_id == 0 || d.confirmed == false) {
                        color = 'red';
                    } else if (d.progress_id == 1) {
                        color = 'yellow'
                    }

                    return (
                        <>
                            <TouchableOpacity
                                key={d.id}
                                onPress={() => {
                                    modal.current.toggle();
                                }}
                                style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}
                            >
                                <View>
                                    <Text style={tw`text-slate-500`}>{d.createdAt}</Text>
                                    <Text style={tw`font-bold mt-2`}>{d.user == null ? '-' : d.user.name}</Text>
                                    <Text style={tw`text-slate-600`}>Servis {d.gadget}</Text>
                                    {!d.confirmed ? (
                                        <Text style={tw`text-${color}-600 font-bold`}>Belum dikonfirmasi</Text>
                                    ) : (
                                        <Text style={tw`text-${color}-600 font-bold`}>{d.progress_id}</Text>
                                    )}
                                </View>
                                <View
                                    style={tw`bg-${color}-300 rounded-full w-13 h-13`}
                                >

                                    <Image
                                        resizeMode='contain'
                                        style={tw`w-14 h-14 self-center -left-2 top-3`}
                                        source={require('./../../assets/illustrations/icons/repairing.png')}
                                    />
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                })}
                <TouchableOpacity
                    onPress={() => {
                        modal.current.toggle();
                    }}
                    style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}
                >
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
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SetTransaction')}
                    style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}>
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
                </TouchableOpacity>
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
            </ScrollView>
        </>

    );
}