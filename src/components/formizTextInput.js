import React from 'react';
import tw from 'twrnc';
import { Button, TextInput, View, Text } from 'react-native';
import { useField } from '@formiz/core';

export default function MultiStepInput(props) {
    const [touched, setTouched] = React.useState(false);
    const { setValue, value, isValid, errorMessage, isSubmitted } = useField(props);
    return (
        <>
            {!isValid ? (
                <Text style={tw`text-red-500`}>{errorMessage}</Text>
            ) : null}
            <TextInput
                onBlur={() => setTouched(true)}
                placeholder={props.placeholder}
                style={tw`w-full border px-5 py-2 rounded mb-5 ${!isValid ? ('border-red-500') : ('border-slate-500')}`}
                onChangeText={e => setValue(e)} value={value ?? ''}
            />
        </>
    )
}