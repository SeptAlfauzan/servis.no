import React from 'react';
import { View, Text, FlatList, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const SearchableModal = (props, ref) => {
    const height = (2 * Dimensions.get('window').height) / 4;
    const [list, setList] = React.useState({});
    const [visible, setVisible] = React.useState(false);
    const offset = useSharedValue(0);
    const opacity = useSharedValue(0);

    React.useEffect(() => {
        setList(props.data);
    }, [props.data])

    React.useEffect(() => {
        if (visible) {
            offset.value = withSpring(-1);
            opacity.value = 1;
        } else {
            offset.value = withSpring(5);
            opacity.value = 0;
        }
    }, [visible])

    React.useImperativeHandle(
        ref,
        () => ({
            toggleShow() {
                setVisible(!visible);
            }
        }),
    )

    const handleSearch = (e) => {
        const data = Array.from(props.data).filter(data => {
            return data.name.includes(e)
        });
        setList(data);
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value * 30 }],
            opacity: withTiming(opacity.value, {
                duration: 200,
                easing: Easing.linear,
            })
        }
    })

    const ListItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.handlePress && props.handlePress(item)} style={tw`py-2 w-full flex flex-row mb-3 z-10 `}>
                {props.flags && <Image resizeMode='cover' style={tw`w-7 h-5 mr-5`} source={{ uri: `https://countryflagsapi.com/png/${item.code}` }} />}
                {/* https://countryflagsapi.com/png/784 */}
                <Text style={tw`w-full`}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Animated.View style={[animatedStyles]}>
            <KeyboardAvoidingView
                ref={ref}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={[tw`w-3/4 h-80 mt-10 rounded-lg shadow-xl bg-white ${visible ? '' : ''}`]}
                keyboardVerticalOffset={10}
            >
                <View style={[tw`w-full h-full px-8 py-5`]}>
                    <View style={tw`flex flex-row w-full`}>
                        <Text>Search</Text>
                        <TouchableOpacity style={tw`ml-auto mb-5`} onPress={() => {
                            setVisible(!visible)
                        }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`mb-3`}>
                        <TextInput style={tw`border border-slate-300 rounded-lg w-full px-4 pr-9 py-1 relative`} onChangeText={handleSearch} placeholder='Please give input' />
                        <View style={tw`absolute right-4 top-0 bottom-0`}>
                            <AntDesign name="search1" size={16} color="black" style={tw`py-3`} />
                        </View>
                    </View>
                    <FlatList
                        data={list}
                        renderItem={ListItem}
                        keyExtractor={item => item.code}
                    />
                </View>
            </KeyboardAvoidingView>
        </Animated.View>
    );
}

export default React.forwardRef(SearchableModal)