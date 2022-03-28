import React from 'react';
import { View, Text, FlatList, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';


const SearchableModal = (props, ref) => {
    const height = (2 * Dimensions.get('window').height) / 4;
    const [list, setList] = React.useState({});
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
        setList(props.data);
        console.log('from', props.data)
    }, [props.data])

    React.useImperativeHandle(
        ref,
        () => ({
            toggleShow() {
                setVisible(!visible);
                console.log('method called from child');
            }
        }),
    )
    const handleSearch = (e) => {
        const data = Array.from(props.data).filter(data => {
            return data.name.includes(e)
        });
        setList(data);
    }


    const ListItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.handlePress && props.handlePress(item)} style={tw`py-2 w-full flex flex-row mb-3 z-10 `}>
                {props.flags && <Image resizeMode='cover' style={tw`w-7 h-5 mr-5`} source={{ uri: `https://countryflagsapi.com/png/${item.code}` }} />}
                {/* https://countryflagsapi.com/png/784 */}
                <Text style={tw`text-md w-full`}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <KeyboardAvoidingView
            ref={ref}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={[tw`w-3/4 h-80 mt-10 rounded-lg shadow-xl bg-white ${visible ? '' : 'hidden'}`]}
            keyboardVerticalOffset={10}
        >
            <View style={[tw`w-full h-full px-8 py-5`]}>
                <View style={tw`flex flex-row w-full`}>
                    <Text>Search</Text>
                    <TouchableOpacity style={tw`ml-auto mb-5`} onPress={() => setVisible(false)}>
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
    )
}

export default React.forwardRef(SearchableModal)