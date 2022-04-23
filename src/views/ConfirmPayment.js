import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';

export default function ConfirmPayment({ navigation, route }) {
    return (
        <View
            style={Style.container}
        >
            <Text
                style={tw`text-2xl mb-3 -top-10 text-slate-300`}
            >Total transaksi anda</Text>
            <Text
                style={tw`text-4xl font-bold`}
            >Rp120323</Text>
            <View
                style={Style.containerBottom}
            >
                <Text style={Style.text}>Tap 'Lanjutkan Bayar' untuk melunasi transaksi anda.</Text>

                <View
                    style={Style.buttonContainer}
                >
                    <TouchableOpacity
                        style={Style.secondaryButton}
                    >
                        <Text style={tw`font-bold`}>Batal Bayar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Style.primaryButton}
                    >
                        <Text style={tw`font-bold`}>Lanjutkan Bayar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

class Style {
    static container = tw`w-full h-full flex justify-center items-center bg-blue-50`;
    static containerBottom = tw`absolute w-4/5 h-50 bg-white bottom-20 rounded-xl px-6`;
    static buttonContainer = tw`flex-row self-center justify-center absolute bottom-0`;
    static secondaryButton = tw`bg-slate-300 w-1/2 py-3 flex items-center rounded-lg m-1`;
    static primaryButton = tw`bg-purple-600 w-1/2 py-3 flex items-center rounded-lg m-1`;
    static text = tw`text-center text-lg mt-10 text-slate-400`;
}