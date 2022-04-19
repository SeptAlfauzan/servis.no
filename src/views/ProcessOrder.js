import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from '../components/Navbar';
import { AntDesign } from '@expo/vector-icons';
import HeaderNav from '../components/HeaderNav';
import ModalProcessOrder from '../ModalProcessOrder';

export default function ProcessOrder({ navigation }) {
    const modal = React.useRef(null);

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
                {[1, 2].map(data => (
                    <>

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
        </>

    );
}