import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import ModalPopup from './../components/ModalPopup';
import HeaderNav from '../components/HeaderNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

const PressableMenu = ({ children, handleOnPress }) => {
    return (
        <TouchableOpacity
            style={tw`rounded-lg overflow-hidden flex-row justify-between my-1`}
            onPress={handleOnPress}
        >
            <View style={tw`flex-row`}>
                {children}
            </View>
            <MaterialIcons name="keyboard-arrow-right" style={tw`self-center`} size={18} color="black" />
        </TouchableOpacity>
    );
}

export default function AccountProfile({ navigation }) {
    const [name, setName] = React.useState(null);
    const [username, setUsername] = React.useState(null);
    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [ispatner, setIspatner] = React.useState(false);

    const modalPopup = React.useRef(null);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('@authorized');
            await AsyncStorage.removeItem('@access-token');
            await AsyncStorage.removeItem('@username');
            await AsyncStorage.removeItem('@is-patner');
            // AsyncStorage.setItem('@nextLaunch', 'true');

            navigation.navigate('Login');
        } catch (error) {
            Alert(error);
        }
    };

    React.useEffect(async () => {
        try {
            // check if account already register as patner
            const patner = await AsyncStorage.getItem('@is-patner');
            patner ? setIspatner(true) : null;

            const getusername = await AsyncStorage.getItem('@username');
            setUsername(getusername);

            const token = await AsyncStorage.getItem('@access-token');
            const { data } = await axios.get(`${API_URL}api/users/user/${getusername}`,
                {
                    headers: {
                        'authorization': token
                    }
                }
            ).then(data => {
                setLoading(false);
                return data;
            });

            console.log('data', data)
            setUser(data.user);
            setName(data.user.name);
        } catch (error) {
            console.log(error);
        }
    }, [])

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
                    <TouchableOpacity style={tw`min-w-24 bg-red-400 rounded-lg px-3 py-2 ml-auto`} onPress={handleLogout}>
                        <Text style={tw`text-center text-white font-bold`}>
                            Iya, Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ModalPopup>
            {/* navigation */}
            <View style={tw`mt-30 mb-20 flex items-center`}>
                <View style={tw`border border-purple-300 rounded-full p-1`}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#000012" />
                    ) : (
                        <Image
                            style={tw`w-20 h-20 rounded-full border`}
                            source={{
                                uri: `https://ui-avatars.com/api/?name=${name}&background=7868E6&color=fff`,
                            }}
                        />
                    )}
                </View>
                <Text style={tw`text-slate-600 font-bold text-lg`}>{name}</Text>
                <Text style={tw`text-slate-400`}>{username}</Text>
            </View>

            <View style={tw` w-full rounded-xl bg-white px-5 py-10`}>

                <PressableMenu handleOnPress={() => navigation.navigate('EditAccount', { user })}>
                    <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                        <MaterialIcons name="edit" size={18} color="black" />
                    </View>
                    <Text style={tw`text-slate-600 self-center ml-5`}>Edit profil</Text>
                </PressableMenu>

                <PressableMenu handleOnPress={null}>
                    <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                        <MaterialIcons name="history" size={18} color="black" />
                    </View>
                    <Text style={tw`text-slate-600 self-center ml-5`}>History pesanan</Text>
                </PressableMenu>
                {!ispatner && (
                    <PressableMenu handleOnPress={() => navigation.navigate('RegisterPatner', { username })}>
                        <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                            <MaterialIcons name="home-repair-service" size={18} color="black" />
                        </View>
                        <Text style={tw`text-slate-600 self-center ml-5`}>Daftar sebagai mitra</Text>
                    </PressableMenu>
                )}

                <PressableMenu handleOnPress={() => modalPopup.current.toggleShow()}>
                    <View style={tw`bg-slate-50 w-10 flex items-center p-2`}>
                        <MaterialIcons name="logout" size={18} color="black" />
                    </View>
                    <Text style={tw`text-slate-600 self-center ml-5`}>Logout</Text>
                </PressableMenu>

            </View>
        </View>
    );
}