import React from 'react';
import { View, Text, TextInput, } from 'react-native';
import tw from 'twrnc';
import RippleButton from '../rippleButton';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';

export default function FormPhoneNumber() {
    const [phonenum, setPhonenum] = React.useState([]);
    const [phonecode, setPhonecode] = React.useState([]);

    React.useEffect(async () => {
        const data = await axios.get('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json');
        setPhonecode(data)
    }, [])

    const handleNumInput = (arg) => {
        const newNum = [...Array.from(phonenum), arg];
        setPhonenum(newNum);
    };
    const handleDeleteNum = () => {
        const newNum = Array.from(phonenum);
        newNum.pop();
        setPhonenum(newNum);
    };
    return (
        <>
            <View style={tw`w-3/4 h-1/2 flex-row items-center justify-center`}>

                <TextInput
                    editable={false}
                    style={tw`border border-slate-300 w-3/4 bg-white rounded-tl rounded-bl px-5 py-3 text-black text-xl tracking-wider`}
                    value={Array.from(phonenum).join("")} />
                <RippleButton onPress={() => console.log(1)}
                    rippleColor={'#7868E6'}
                    overflow={false}
                    style={tw`bg-purple-600 py-4 px-5 flex items-center justify-center rounded-tr rounded-br`}>
                    <Text style={tw`text-white`}>Selanjutnya</Text>
                </RippleButton>
            </View>
            <View style={tw`w-full h-1/2 justify-end items-center`}>
                {/* 1,2,3 */}
                <View style={tw`flex flex-wrap h-1/4 w-full`}>
                    <RippleButton
                        onPress={() => handleNumInput(1)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>1</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={() => handleNumInput(2)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>2</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={() => handleNumInput(3)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>3</Text>
                    </RippleButton>
                </View>
                {/* 4,5,6 */}
                <View style={tw`flex flex-wrap h-1/4 w-full`}>
                    <RippleButton
                        onPress={() => handleNumInput(4)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>4</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={() => handleNumInput(5)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>5</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={() => handleNumInput(6)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>6</Text>
                    </RippleButton>
                </View>
                {/* 7,8,9 */}
                <View style={tw`flex flex-wrap h-1/4 w-full`}>
                    <RippleButton
                        onPress={() => handleNumInput(7)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>7</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={() => handleNumInput(8)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>8</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={() => handleNumInput(9)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>9</Text>
                    </RippleButton>
                </View>
                {/* +, 0, delete */}
                <View style={tw`flex flex-wrap h-1/4 w-full`}>
                    <RippleButton
                        onPress={() => handleNumInput('+')}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>+</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={() => handleNumInput(0)}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Text style={tw`text-xl`}>0</Text>
                    </RippleButton>
                    <RippleButton
                        onPress={handleDeleteNum}
                        rippleColor={'#7868E6'}
                        overflow={false}
                        style={tw`w-1/3 h-full bg-white flex items-center justify-center`}
                    >
                        <Feather name="delete" size={24} color="black" />
                    </RippleButton>
                </View>
            </View>
        </>
    )
}