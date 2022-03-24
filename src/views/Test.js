import { View, Text } from 'react-native';
import tw from 'twrnc';

export default function Test({ navigation, route }) {
    return (
        <View style={tw`flex w-full h-full justify-center items-center`}>
            <Text>Data dari onboard {route.params.name && route.params.name}</Text>
        </View>
    );
}