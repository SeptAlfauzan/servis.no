import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';

export default function HeaderNav({ title, navigation, backto }) {
    const handleGoback = () => {
        try {
            backto ? navigation.navigate(backto) : navigation.pop();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={[tw`absolute pb-3 pt-8 px-8 flex-row bg-slate-50 z-10`, { width: Dimensions.get('screen').width }]}>
            <TouchableOpacity style={tw` mt-8 absolute ml-8`} onPress={handleGoback}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>
            <Text style={tw`mx-auto`}>{title}</Text>
        </View>
    );
}
