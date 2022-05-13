import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from '../components/Navbar';
import { AntDesign } from '@expo/vector-icons';
import HeaderNav from '../components/HeaderNav';
import ModalProcessOrder from '../ModalProcessOrder';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from 'react-native-dotenv';


const ItemList = (data) => {
    const { item, handlePress } = data;
    let color;

    if (item.order_status_id == 1 && item.confirmed == false) {
        color = 'red';
    } else {
        color = 'yellow'
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    console.log(item);
                    handlePress(item);
                }}
                style={tw`max-h-30 w-full border border-slate-300 rounded-lg px-5 py-3 flex-row justify-between mb-2`}
            >
                <View>
                    <Text style={tw`text-slate-500`}>{item.createdAt}</Text>
                    <Text style={tw`font-bold mt-2`}>{item.user == null ? '-' : item.user.name}</Text>
                    <Text style={tw`text-slate-600`}>Servis {item.gadget}</Text>
                    {!item.confirmed ? (
                        <Text style={tw`text-${color}-600 font-bold`}>Belum dikonfirmasi</Text>
                    ) : (item.bill > 0 && item.order_status_id == 1) ? (
                        <Text style={tw`text-${color}-600 font-bold`}>Menunggu pembayaran</Text>
                    ) : (
                        <Text style={tw`text-${color}-600 font-bold`}>{item.order_status.name}</Text>
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
}

export default function ProcessOrder({ navigation }) {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const modal = React.useRef(null);


    const loadData = async () => {
        setLoading(true)
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
            // console.log(patner)
            const responseGetOrders = await axios.get(`https://servisno.herokuapp.com/api/orders/need-proceed/${patner.id}`);
            setData(responseGetOrders.data.data)
            // console.log(responseGetOrders.data.data)
        } catch (error) {
            alert(`${error.message}, ${error.response.data}`);
            setData([]);
        }
        setLoading(false);
    }

    React.useEffect(async () => {
        navigation.addListener('focus', async () => {
            await loadData();
        });
        await loadData();
    }, [])

    const navigateConfirm = (data) => navigation.navigate('ConfirmOrder', data);
    const navigateToChangeStatus = (data) => navigation.navigate('ChangeStatusOrder', data);

    const handlePress = (arg) => {
        if (!arg.confirmed) {
            //belum dikonfirmasi
            navigateConfirm(arg);
        } else if (arg.confirmed && arg.order_status_id == 2) {
            //sudah dibayar
            console.log('data dikirim', arg)
            navigateToChangeStatus({
                data: arg,
                text: 'Sedang Dikerjakan'
            });
        } else if (arg.confirmed && arg.order_status_id == 3) {
            //sudah dikerjakan
            console.log('data dikirim', arg)
            navigateToChangeStatus({
                data: arg,
                text: 'Diantar'
            });
        }
    }

    return (
        <>
            <ModalProcessOrder ref={modal} />
            <HeaderNav title="Process Order" navigation={navigation} />
            <View
                style={tw`flex h-full w-full justify-center items-center`}
            >
                {(!loading && data.length == 0) && (
                    <Text>No Order</Text>
                )}
                {(loading || refresh) && (
                    <ActivityIndicator style={tw`absolute top-50`} size="large" color="#ffffff" />
                )}
                {(!loading && data.length > 0) && (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(props) => <ItemList {...props} handlePress={handlePress} />}
                        alwaysBounceHorizontal={true}
                        contentContainerStyle={tw`items-start flex relative px-8 py-14`}
                        style={tw`w-full`}
                    />
                )}
            </View>
            {/* <TouchableOpacity
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
                </View> */}
        </>

    );
}