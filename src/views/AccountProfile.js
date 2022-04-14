import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import ModalPopup from './../components/ModalPopup';
import HeaderNav from '../components/HeaderNav';


const PressableMenu = () => { }

export default function AccountProfile({ navigation }) {
    const modalPopup = React.useRef(null);

    return (
        <View style={tw`flex-col h-full w-full bg-slate-50 pt-10 px-3 items-center`}>
            <HeaderNav title="Profil Akun" navigation={navigation} />
            {/* modal for logout alert */}
            <ModalPopup ref={modalPopup}>
                <>
                    <MaterialIcons name="logout" size={20} color="black" style={tw`mr-auto`} />
                    <Text style={tw`font-bold mb-3 text-lg mr-auto`}>Logout Akun</Text>
                    <Text style={tw`text-slate-600 mr-auto`}>Apakah anda yakin ingin keluar dari akun anda?</Text>
                </>
                <View style={tw`flex-row w-full mt-4`}>
                    <TouchableOpacity style={tw`min-w-24 bg-slate-100 rounded-lg px-3 py-2 mr-auto`} onPress={() => modalPopup.current.toggleShow()}>
                        <Text style={tw`text-center font-bold`}>
                            Batal
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`min-w-24 bg-red-400 rounded-lg px-3 py-2 ml-auto`}>
                        <Text style={tw`text-center text-white font-bold`}>
                            Iya, Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ModalPopup>
            {/* navigation */}
            <View style={tw`mt-30 mb-20 flex items-center`}>
                <View style={tw`border border-purple-300 rounded-full p-1`}>
                    <Image
                        style={tw`w-20 h-20 rounded-full border`}
                        source={{
                            uri: 'https://ui-avatars.com/api/?name=Septa+alfauzan&background=7868E6&color=fff',
                        }}
                    />
                </View>
                <Text style={tw`text-slate-600 font-bold text-lg`}>Septa Alfauzan</Text>
                <Text style={tw`text-slate-400`}>septa</Text>
            </View>

            <View style={tw` w-full rounded-xl bg-white px-5 py-10`}>
                <TouchableOpacity
                    style={tw`rounded-lg overflow-hidden flex-row justify-between my-1`}
                    onPress={() => navigation.navigate('EditAccount')}
                >
                    <View style={tw`flex-row`}>
                        <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                            <MaterialIcons name="edit" size={18} color="black" />
                        </View>
                        <Text style={tw`text-slate-600 self-center ml-5`}>Edit profil</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" style={tw`self-center`} size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`rounded-lg overflow-hidden flex-row justify-between my-1`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                            <MaterialIcons name="history" size={18} color="black" />
                        </View>
                        <Text style={tw`text-slate-600 self-center ml-5`}>History pesanan</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" style={tw`self-center`} size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`rounded-lg overflow-hidden flex-row justify-between my-1`}>
                    <View style={tw`flex-row`}>
                        <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                            <MaterialIcons name="home-repair-service" size={18} color="black" />
                        </View>
                        <Text style={tw`text-slate-600 self-center ml-5`}>Daftar sebagai mitra</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" style={tw`self-center`} size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`rounded-lg overflow-hidden flex-row justify-between my-1`} onPress={() => modalPopup.current.toggleShow()}>
                    <View style={tw`flex-row`}>
                        <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                            <MaterialIcons name="logout" size={18} color="black" />
                        </View>
                        <Text style={tw`text-slate-600 self-center ml-5`}>Logout</Text>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" style={tw`self-center`} size={18} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}