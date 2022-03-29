import React from 'react';
import tw from 'twrnc';
import { Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useField } from '@formiz/core';
import { Entypo } from '@expo/vector-icons';

export default function MultiStepInput(props) {
    const [touched, setTouched] = React.useState(false);
    const { setValue, value, isValid, errorMessage, isSubmitted } = useField(props);
    const { type } = props;
    const [peek, setPeek] = React.useState(false);
    const handlePeekPassword = () => setPeek(!peek);
    return (
        <>
            {!isValid ? (
                <Text style={tw`text-red-500`}>{errorMessage}</Text>
            ) : null}
            {type == 'password' ? (
                <View>
                    <TextInput placeholder='password'
                        style={tw`w-full border px-5 py-2 rounded mb-5 ${!isValid ? ('border-red-500') : ('border-slate-500')}`}
                        onChangeText={e => setValue(e)} value={value ?? ''}
                        secureTextEntry={!peek} />
                    <TouchableOpacity style={tw`absolute right-5 top-0 bottom-0`} onPress={handlePeekPassword}>
                        <Entypo name={peek ? 'eye-with-line' : 'eye'} size={20} color="black" style={tw`py-3`} />
                    </TouchableOpacity>
                </View>
            ) : (

                <TextInput
                    onBlur={() => setTouched(true)}
                    placeholder={props.placeholder}
                    keyboardType={type ? type : 'default'}
                    style={tw`w-full border px-5 py-2 rounded mb-5 ${!isValid ? ('border-red-500') : ('border-slate-500')}`}
                    onChangeText={e => setValue(e)} value={value ?? ''}
                />
            )}
        </>
    )
}