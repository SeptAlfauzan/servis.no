import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
;
import tw from 'twrnc';
import OnboardData from '../utils/onboardData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboard({ navigation }) {
    const [currindex, setCurrindex] = React.useState(0);
    const [data, setData] = React.useState(null);
    const [datalen, setDatalen] = React.useState(0);
    const flatlistRef = React.useRef(null);

    React.useEffect(() => {
        const oboardData = new OnboardData();
        setData(JSON.parse(oboardData.get()));
        setDatalen(JSON.parse(oboardData.get()).length - 1)
    }, []);

    const moveStep = (arg) => {
        try {
            flatlistRef.current && console.log(flatlistRef.current.scrollToIndex({ index: arg }));
            setCurrindex(arg);
        } catch (error) {
            console.log(error);
        }
    }
    const move = (arg) => {
        try {
            const option = arg === 'next' ? 1 : -1;
            flatlistRef.current && flatlistRef.current.scrollToIndex({ index: currindex + option });
            setCurrindex(currindex + option);
        } catch (error) {
            console.log(error);
        }
    }
    const slide = ({ item }) => {
        const { image, text } = item;
        return (
            <View style={[tw`h-full`, { width: Dimensions.get('screen').width }]}>
                <Image style={tw`w-full h-2/4`} resizeMode="cover" source={image} />
                <Text style={tw`text-center text-slate-500 px-10 mt-5`}>{text}</Text>
            </View>
        );
    }
    const navigateScreen = () => {
        // set to async storage
        try {
            AsyncStorage.setItem('@nextLaunch', 'true');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={tw`flex flex-col h-full w-full bg-white`}>
            <FlatList scrollEnabled={false} ref={flatlistRef} style={tw`mt-10`} data={data} renderItem={slide} keyExtractor={item => item.key} bounces={false} pagingEnabled horizontal showsHorizontalScrollIndicator={false} />
            <View style={tw`px-10 absolute bottom-0 self-center p-10 flex w-full`}>
                <View style={tw`flex flex-row w-14 justify-between self-center`}>
                    <TouchableOpacity style={tw`w-3 h-3 rounded-full bg-slate-500`} onPress={() => moveStep(0)}></TouchableOpacity>
                    <TouchableOpacity style={tw`w-3 h-3 rounded-full bg-slate-500`} onPress={() => moveStep(1)}></TouchableOpacity>
                    <TouchableOpacity style={tw`w-3 h-3 rounded-full bg-slate-500`} onPress={() => moveStep(2)}></TouchableOpacity>
                </View>
                <View style={tw`mt-10 self-end flex flex-row justify-between w-full`}>
                    {currindex > 0 && (
                        <TouchableOpacity style={tw` bg-slate-200 rounded-full px-5 py-2`} onPress={() => move('back')}>
                            <Text>Kembali</Text>
                        </TouchableOpacity>
                    )}
                    {currindex >= datalen ? (
                        <TouchableOpacity style={tw` bg-slate-200 rounded-full px-5 py-2 ml-auto`} onPress={navigateScreen}>
                            <Text>Oke, mulai</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={tw` bg-slate-200 rounded-full px-5 py-2 ml-auto`} onPress={() => move('next')}>
                            <Text>Selanjutnya</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
}