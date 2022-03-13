import React from 'react';
import { View, ToastAndroid, Dimensions, Text } from 'react-native';

import tw from 'twrnc';

import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from 'react-native-gesture-handler';

export default function SwipeUpDrawer(props) {
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
                    {(props.placeholderText && !props.data) && <Text style={tw`text-xl text-slate-500 text-center mt-5`}>{props.placeholderText}</Text>}
                    {/* detail */}
                    {props.data &&
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`w-6/12 h-30 rounded-lg bg-slate-300`}></View>
                            <View style={tw`w-5/12 h-30 flex justify-between`}>
                                <Text style={tw`text-xl text-black`}>{props.data}</Text>
                                <View>
                                    <Text style={tw`text-sm text-slate-500`}>5.0</Text>
                                    <Text style={tw`text-sm text-slate-500`}>5.0</Text>
                                </View>
                            </View>
                        </View>
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