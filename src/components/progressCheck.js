import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import tw from 'twrnc';

export default function ProgressCheck(props) {
    const { active, length } = props;
    return (
        <View style={tw`w-full`}>
            <Text style={tw`text-2xl font-bold w-3/4 mx-auto`}>
                Selesaikan registrasi anda
            </Text>
            <View style={tw`h-1 w-3/4 bg-purple-300 mx-auto flex flex-row justify-between mt-5`}>
                {Array(length).fill(undefined).map((data, index) => (
                    <View key={index + 1} style={tw`w-8 h-8 -top-4 flex justify-center items-center rounded-full ${(index + 1) <= active ? 'bg-purple-600' : 'bg-purple-300'}`}>
                        <AntDesign name="check" size={16} color="white" />
                    </View>
                ))}
            </View>
        </View>
    );
}