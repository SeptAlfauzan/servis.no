import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import tw from 'twrnc';
import FormPersonal from '../components/register/FormPersonal';
import FormAccount from '../components/register/FormAccount';
import FormPhoneNumber from '../components/register/FormPhoneNumber.js';

export default function Register() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const list = [
            {
                'key': 0,
                'component': <FormPersonal />
            },
            {
                'key': 1,
                'component': <FormAccount />
            },
            {
                'key': 2,
                'component': <FormPhoneNumber />
            },
        ];
        setData(list);
    }, [])
    const Forms = ({ item }) => {
        return (
            <View style={[tw`h-full flex justify-center items-center`, { width: Dimensions.get('screen').width }]}>
                {item.component}
            </View>
        );
    };
    return (
        <View style={tw`flex w-full h-full justify-center items-center`}>
            <FlatList style={tw`mt-10`} data={data} renderItem={Forms} keyExtractor={item => item.key} bounces={false} pagingEnabled horizontal />
            <View style={tw`flex flex-row justify-between w-3/4 mt-5`}>
                <TouchableOpacity style={tw`bg-slate-300 px-5 py-2 rounded-full`}>
                    <Text>
                        Sebelumnya
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`bg-slate-300 px-5 py-2 rounded-full`}>
                    <Text>
                        Selanjutnya
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}