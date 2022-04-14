import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import tw from 'twrnc';

export default function Login({ navigation }) {
    const [peek, setPeek] = React.useState(false);
    const handlePeekPassword = () => setPeek(!peek);
    return (
        <View style={tw`flex flex-col w-full h-full pt-30 pb-10 justify-between items-center`}>
            {/* form */}
            <View style={tw`w-3/4`}>
                <Text style={tw`text-2xl`}>Silahkan Login</Text>
                <TextInput placeholder='username' style={tw`w-full border border-slate-500 rounded mt-5 px-5 py-2`} />
                <View style={tw`relative w-full border mt-5 `}>
                    <TextInput placeholder='password' style={tw`w-full border border-slate-500 rounded pl-5 pr-12 py-2`} secureTextEntry={!peek} />
                    <TouchableOpacity style={tw`absolute right-5 top-0 bottom-0`} onPress={handlePeekPassword}>
                        <Entypo name={peek ? 'eye-with-line' : 'eye'} size={20} color="black" style={tw`py-3`} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('PushNotif')}>
                    <Text style={tw`text-purple-500 text-right py-3 font-bold`}>Lupa password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-slate-500 mt-5 rounded w-full`}>
                    <Text style={tw`text-white text-lg text-center py-3`}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`flex flex-row w-3/4 justify-between`}>
                <Text>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={tw`text-purple-500 text-right font-bold`}>Registrasi sekarang.</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}