import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        borderRadius: 5,
    },
    focusCell: {
        borderColor: '#000',
    },
});

const CELL_COUNT = 6;

const Verification = ({ navigation }) => {
    const [value, setValue] = useState('');
    const [verifCode, setVerifCode] = useState(null);
    const [email, setEmail] = useState(null);
    const [disable, setDisable] = React.useState(false);
    const [valid, setValid] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [username, setUsername] = React.useState(null);

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    React.useEffect(async () => {
        setVerifCode(await AsyncStorage.getItem('@verificationCode'));
        setEmail(await AsyncStorage.getItem('@emailVerication'));
        setUsername(await AsyncStorage.getItem('@username'));
    }, []);

    React.useEffect(() => {
        if (value.length == 6) {
            setDisable(false)
        } else {
            setDisable(true);
            setInValid(false);
        }
    }, [value]);

    const setInValid = (arg) => {
        if (arg) {
            setValid(false);
            setError('Verifikasi kode anda salah');
        } else {
            setValid(true);
            setError(null);
        }
    }

    const sendVerification = async () => {
        console.log(username)
        try {
            const res = await axios.put(`${API_URL}api/users/user/verify/${username}`, {
                email,
                verificationCode: verifCode,
            });
            res.status == 200 ? navigation.navigate('SuccessScreen', {
                text: 'verifikasi akun anda berhasil',
                view: 'Login'
            }) : null;
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleVerification = async () => {
        value == verifCode ? sendVerification() : setInValid(true);
        // navigation.navigate('SuccessScreen')
    }

    return (
        <SafeAreaView style={[tw`flex h-full w-full px-10`, { top: Dimensions.get('screen').height * 0.3 }]}>
            <Text style={styles.title}>Verification</Text>
            <Text style={tw`text-center text-slate-500 mt-4`}>Silahkan masukkan 6 digit kode verifikasi yang dikirimkan pada email anda.</Text>
            <Text style={tw`text-center text-red-500 mt-4`}>{error}</Text>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && tw`border-purple-600`, !valid && tw`border-red-600`]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <TouchableOpacity style={tw`${disable ? 'bg-slate-300' : 'bg-purple-600'} px-8 py-3 rounded-full mt-5`} disabled={disable} onPress={handleVerification}>
                <Text style={tw`text-white text-lg font-bold text-center`}>Verifikasi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default Verification;