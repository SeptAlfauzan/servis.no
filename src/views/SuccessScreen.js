import React from 'react';
import tw from 'twrnc';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SuccessScreen({ navigation }) {
    return (
        <View style={tw`flex h-full w-full justify-center items-center bg-green-400`}>
            <LottieView style={tw`w-5/6`} source={require('../../assets/lotties/1708-success.json')} autoPlay={true} loop={false} />
            <Text style={tw`text-white text-xl text-center w-3/4`}>Verifikasi akun anda telah berhasil</Text>
            <TouchableOpacity style={tw`bg-green-500 px-8 py-2 mt-10 rounded-full`} onPress={() => navigation.navigate('Login')}>
                <Text style={tw`text-white text-lg`}>Selanjutnya</Text>
            </TouchableOpacity>
        </View>
    );
} 