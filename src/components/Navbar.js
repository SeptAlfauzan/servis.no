import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Settings } from 'react-native-web';

export default function Navbar({ state, descriptors, navigation }) {
    const [routename,
        setRoutename] = React.useState(null);

    React.useEffect(() => {
        const currentIndex = state.index;
        const currentRoute = state.routeNames[currentIndex];

        setRoutename(currentRoute);
    }, [])

    const navigate = (name) => {
        setRoutename(name);
        navigation.navigate(name);
    }

    return (
        <View
            style={tw`absolute self-center flex flex-row w-11/12 min-h-10 bg-slate-300 bottom-5 py-3 px-5 justify-between rounded-full`}
        >
            <TouchableOpacity
                style={tw`flex justify-center items-center w-20 py-1 rounded-full ${routename == 'Home' ? 'bg-purple-400' : null}`}
                onPress={() => navigate('Home')}
            >
                <MaterialIcons name="home-filled" size={24} style={tw`${routename == 'Home' ? 'text-white' : 'text-black'}`} />
                <Text style={tw`text-xs ${routename == 'Home' ? 'text-white' : 'text-black'}`}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`flex justify-center items-center w-20 py-1 rounded-full`}
                onPress={() => navigation.navigate('ConfirmPayment')}
            >
                <MaterialIcons name="qr-code" size={24} style={tw`${routename == 'Scan' ? 'text-white' : 'text-black'}`} />
                <Text style={tw`text-xs`}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={tw`flex justify-center items-center w-20 py-1 rounded-full ${routename == 'History' ? 'bg-purple-400' : null}`}
                onPress={() => navigate('History')}
            >
                <MaterialIcons name="history" size={24} style={tw`${routename == 'History' ? 'text-white' : 'text-black'}`} />
                <Text style={tw`text-xs ${routename == 'History' ? 'text-white' : 'text-black'}`}>History</Text>
            </TouchableOpacity>
        </View>
    );
}