import React from 'react';
import { View, ToastAndroid, Dimensions, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { API_URL } from 'react-native-dotenv';

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';
import axios from 'axios';

const height = Dimensions.get('window').height;
export default function SwipeUpDrawer(props) {
    const { data } = props;
    const [ordercount, setOrdercount] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const initialHeight = height + (height * 1 / 8);
    const fullHeight = height * 3 / 4;
    const y = useSharedValue(initialHeight);

    React.useEffect(async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://servisno.herokuapp.com/api/orders/not-finished/${data.id}`);
            console.log(res)
            console.log(res.data.data.length)
            setOrdercount(res.data.data.length)
            setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }, [data])

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.startY = y.value;
        },
        onActive: (event, context) => {
            if (Math.abs(event.translationY) > 110) {
                y.value = context.startY + event.translationY;
            }
        },
        onEnd: (event, context) => {
            // swipe up
            if (event.translationY < -100) {
                y.value = withSpring(fullHeight);
            } else if (event.translationY > 100) {
                y.value = withSpring(initialHeight);
            } else {
                console.log('abs', Math.abs(event.translationY));
                console.log('current', event.translationY);
            }

        },
    })
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: y.value,
                },
            ],
        };
    });

    return (
        <>
            <GestureHandlerRootView style={tw`flex w-full justify-center items-center absolute`}>
                {/* component background */}
                {props.children}
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[tw`rounded-t-2xl w-full bg-white absolute flex items-center px-8`, animatedStyle, Styles.drawerHeight]}>
                        <View style={tw`w-30 h-1 rounded bg-slate-400 my-3`} />
                        {/* no data select anim */}
                        {(props.placeholderText && !data) && <Text style={tw`text-xl text-slate-500 text-center mt-5`}>{props.placeholderText}</Text>}
                        {/* detail */}
                        {data &&
                            (
                                <>

                                    <Text style={tw`text-xl text-black text-left mb-3 mr-auto`}>{data.name}</Text>
                                    <View style={tw`flex flex-row justify-between w-full`}>
                                        <Image
                                            style={tw`w-6/12 h-30 rounded-lg bg-slate-300`}
                                            source={{
                                                uri: `${API_URL}${data.photo}` || 'https://reactnative.dev/img/tiny_logo.png',
                                            }}></Image>
                                        <View style={tw`w-5/12 h-30 flex justify-between`}>
                                            <Text style={tw`text-sm text-slate-400`}>{data.address}</Text>
                                            <View >
                                                <Text style={tw`text-sm text-slate-500`}>{data.star}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={tw`mt-10 w-full`}>
                                        {/* orders */}
                                        <View style={tw`w-full bg-slate-100 rounded h-20 flex flex-row justify-between items-center px-10 rounded`}>
                                            <Text style={tw`text-left text-lg w-3/5`}>Jumlah Antrian Saat ini</Text>
                                            {loading ? (
                                                <ActivityIndicator size="large" color="#ffffff" />
                                            ) : (
                                                <Text style={tw`text-4xl`}>{ordercount}</Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={tw`mt-10 w-full`}>
                                        <Text style={tw`text-left`}>Review</Text>
                                        {/* orders */}
                                        <View style={tw`w-full bg-slate-100 rounded h-30 flex flex-row justify-between items-center px-10`}>
                                            <Text style={tw`text-4xl`}>10</Text>
                                        </View>
                                    </View>
                                </>
                            )
                        }
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
            {data && (
                <TouchableOpacity style={[tw`w-full bg-purple-600  mt-10 px-18 py-5 rounded absolute z-10 bottom-0 rounded-t-xl flex-row justify-between`]} onPress={() => props.navigation.navigate('MakeOrder')}>
                    <Text style={tw`text-white font-bold text-lg`}>
                        Buat Pesanan baru
                    </Text>
                    <MaterialIcons name="add-shopping-cart" style={tw`font-bold`} size={24} color="white" />
                </TouchableOpacity>
            )}
        </>
    );
}

const Styles = {
    drawerHeight: {
        height: '200%',
    }
}