import React from 'react';
import { View, ToastAndroid, Dimensions, Text, TouchableOpacity } from 'react-native';

import tw from 'twrnc';

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';

export default function SwipeUpDrawer(props) {
    const { data } = props;
    const height = Dimensions.get('window').height;
    const initialHeight = height + (height * 1 / 4);
    const fullHeight = height * 3 / 4;
    const y = useSharedValue(initialHeight);

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
                                <View style={tw`flex flex-row justify-between w-full`}>
                                    <View style={tw`w-6/12 h-30 rounded-lg bg-slate-300`}></View>
                                    <View style={tw`w-5/12 h-30 flex justify-between`}>
                                        <Text style={tw`text-xl text-black`}>{data.name}</Text>
                                        <Text style={tw`text-sm text-black`}>{data.address}</Text>
                                        <View >
                                            <Text style={tw`text-sm text-slate-500`}>{data.star}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={tw`mt-10 w-full`}>
                                    <Text style={tw`text-left border`}>Detail</Text>
                                    {/* orders */}
                                    <View style={tw`w-full bg-slate-100 rounded h-30 flex flex-row justify-between items-center px-10`}>
                                        <Text style={tw`border text-4xl`}>10</Text>
                                    </View>
                                </View>
                                <View style={tw`mt-10 w-full`}>
                                    <Text style={tw`text-left border`}>Detail</Text>
                                    {/* orders */}
                                    <View style={tw`w-full bg-slate-100 rounded h-30 flex flex-row justify-between items-center px-10`}>
                                        <Text style={tw`border text-4xl`}>10</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={tw`w-full bg-purple-600 bottom-0 mt-10 px-6 py-5 rounded`}>
                                    <Text>
                                        Buat Pesanan
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )
                    }
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}

const Styles = {
    drawerHeight: {
        height: '200%',
    }
}